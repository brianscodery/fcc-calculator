import React from 'react';
import './App.css';
import Display from './Display';
import Buttons from './Buttons';


export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      queue: [],
      input: '0',
      keyStates: {} //1:true, 2: true, etc
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.listener = this.listener.bind(this);
   }

 
  handleNumber = (value) => {
    this.setState(prevState => {
      if(prevState.input.length >= 13) {return;}
        if(this.isOperator(prevState.input)){
          return {
            input: value.toString(),
            queue: [...prevState.queue, value.toString()]
          };
        } else {
          
          const newValue = (prevState.input === '0') ? 
            value.toString() :
            prevState.input + value.toString();
          return {
            input: newValue,
            queue: [...this.removeLast(prevState.queue), newValue]
          };
        }
    });
  }




handleOperator = (operator) => {
  this.setState(prevState => {
    if(this.canPushOperator(operator, prevState)){
      return  {
        input: operator,
        queue: [...prevState.queue,operator]
      };
    } else {
      return this.shouldRemoveTwo(prevState.queue) ?
      {
        input: operator,
        queue:[...this.removeLast([...this.removeLast(prevState.queue)]),operator]
      }
      :
      {
        input: operator,
        queue: [...this.removeLast(prevState.queue),operator]
      };
    }
  });
}


canPushOperator = (operator, state) => {
  if(this.isNumber(state.input)) {
    return true;
  }
  if(operator === '-' && this.onlyOneTrailingOperator(state)){
    return true;
  }
  return false;
}

onlyOneTrailingOperator = (state) => {
  const queue = state.queue;
  const finalIndex = queue.length - 1;
  return this.isOperator(queue[finalIndex]) && !this.isOperator(queue[finalIndex -1]);
}
isOperator = (input) => {
const operators = ['+','-','*','/'];
return operators.includes(input);
}
isNumber = (input) => {
  return !this.isOperator(input);
}

shouldRemoveTwo = (queue) => {
  try {
    const lastIndex = queue.length - 1;
    return this.isOperator(queue[lastIndex]) && this.isOperator(queue[lastIndex - 1]);
  } catch (err) {
    return false;
  }
}

handleButtonClick = (event) => {
  console.log(event.target.value)
  const value = event.target.value;
  this.handleEvent(value);

}


evaluate = (val1, operator, val2) => {
  if(!val1 || !operator){
    return Number(val2);
  }
  let result;
  switch(operator){
    case '+':
      result = Number(val1) + Number(val2);
      break;
    case '-':
      result = Number(val1) - Number(val2);
      break;
    case '*':
      result = Number(val1) * Number(val2);
      break;
    case '/':
      result = Number(val1) / Number(val2);
      break;
    default:
      break;
  }
  return Number(result.toString().slice(0,14));
}
calculateQueue = (queue) => {
  
  const mergeNegatives = queue => {
    queue.forEach((el,i,arr) => {
      if(el ==='-' && this.isOperator(arr[i-1]) && arr[i+1]) {
        arr[i] = '';
        arr[i+1] = '-' + arr[i + 1];
      }
    });
    return queue.filter(el => el);
  }
 const multDivSearchFunction = el => {
   if(el === '*' || el === '/') {
     return true;
   }
   return false;
 }
 const AddSubSearchFunction = el => {
   if(el === '+' || el === '-') {
     return true;
   }
   return false;
 }

  const mutableQueue = mergeNegatives([...queue]);
  let indexOfMultiplyOrDivide = mutableQueue.findIndex(multDivSearchFunction)
  while(indexOfMultiplyOrDivide !== -1){
    const i = indexOfMultiplyOrDivide;
    const newVal = this.evaluate(mutableQueue[i-1],mutableQueue[i],mutableQueue[i+1]);
    mutableQueue.splice(i - 1, 3,  newVal);
    indexOfMultiplyOrDivide = mutableQueue.findIndex(multDivSearchFunction)
  }
  let indexOfAddOrSubtract = mutableQueue.findIndex(AddSubSearchFunction)
  while(indexOfAddOrSubtract !== -1){
    const i = indexOfAddOrSubtract;
    const newVal = this.evaluate(mutableQueue[i-1],mutableQueue[i],mutableQueue[i+1]);
    mutableQueue.splice(i - 1, 3,  newVal);
    indexOfAddOrSubtract = mutableQueue.findIndex(AddSubSearchFunction)
  }
  return mutableQueue[0];
}
handleEnter = () => {
  
  this.setState(prevState => {
    const result = this.calculateQueue(prevState.queue);
    return {
    queue: [result],
    input: result
  }})
}

  handleClear = () => {
    this.setState({
      queue: [],
      input: '0'
    });
  }

  
 handleNegation() {
  
}
 


  listener(event) {
    const key = event.key;
    console.log(key)
    if(key==='-' && event.shiftKey){
      this.handleEvent('negate');
      return;
    }
    this.handleEvent(key);
  
}
  
handleEvent(value){
  this.setState(prevState => {
    const keyStates = {...prevState.keyStates};
    keyStates[value] = true;
    setTimeout(()=>this.setState(prevState => {
      const keyStates = {...prevState.keyStates};
      keyStates[value] = false;
      return {keyStates};
    }),500);
    return {keyStates};
  })
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
   if (numbers.includes(value)){
      this.handleNumber(value);
      return;
    }
    if(this.isOperator(value)) {
      this.handleOperator(value);
      return;
    }
    if(value==='.'){
      this.handleDecimal();
      return;
    }
    if(value.toLowerCase()==="clear"){
      this.handleClear();
      return;
    }
    if(value === '=' || value.toLowerCase() === 'enter'){
      this.handleEnter();
      return;
    }
    if(value === 'negate'){
      this.handleNegation();
      return;
    }
}


    handleDecimal() {
      
      this.setState(prevState=> {
        if (prevState.input.includes('.')){ return;}
        const newInput = prevState.input + '.';
        return {
          input: newInput,
          queue: [...this.removeLast(prevState.queue), newInput]
        };
      });
  }

  removeLast(queue) {
    const returnQueue = [...queue];
    
    returnQueue.pop();
    
    return returnQueue;

  }

 



  componentDidMount(){
    document.addEventListener('keydown', this.listener, true)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.listener, true)
  }



   render() {

     const containerStyle = {
       
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
     };

  const calculatorStyle = {
    width: '330px',
    height: '600px',
    background: '#1c1c1c',
    boxShadow: '-6px 6px 5px 0px rgba(0,0,0,0.75)',
    borderRadius: '16px',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    gridTemplateColumns: '70px 70px 70px 70px',
    gridTemplateRows: '140px auto 70px 70px 70px 70px 70px 20px',
    gridColumnGap: '15px',
    gridRowGap: '15px',
    padding: '15px'
  };

    return (
      
      <div style={containerStyle}>
        <div style={calculatorStyle}>
          <Display queue={this.state.queue} input={this.state.input}/>
          <Buttons 
            clickHandler={this.handleButtonClick}
            keyStates={this.state.keyStates}
            />
        </div>
      </div>
    );
  }
}




