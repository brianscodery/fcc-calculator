import React from 'react';
import Button from './Button';
export default class Buttons extends React.Component {
colors = {
  number: '#505050',
  operation: '#ff9500',
  other: '#d4d4d2'
}
render() {
  
  return (
    <>
      <div className="spacer" style={{gridColumn: '1 / span 4'}}></div>
     <Button myid="clear" value="clear"  width="2" text="AC" clickHandler={this.props.clickHandler}  color={this.colors.other} span="2" keyState={this.props.keyStates.clear}/>
     <Button myid="negate" value="negate"  text="±" clickHandler={this.props.clickHandler} color={this.colors.other} keyState={this.props.keyStates.negate}/>

     <Button myid="divide" value="/"  text="÷" clickHandler={this.props.clickHandler} color={this.colors.operation} keyState={this.props.keyStates['/']}/>

   
     <Button myid="seven" value="7" clickHandler={this.props.clickHandler} color={this.colors.number} keyState={this.props.keyStates['7']}/>
     <Button myid="eight" value="8" clickHandler={this.props.clickHandler} color={this.colors.number} keyState={this.props.keyStates['8']}/>
     <Button myid="nine" value="9" clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['9']}/>
     <Button myid="multiply" value="*"  text="x" clickHandler={this.props.clickHandler} color={this.colors.operation}  keyState={this.props.keyStates['*']}/>
     
     <Button myid="four" value="4" clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['4']}/>
     <Button myid="five" value="5" clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['5']}/>
     <Button myid="six" value="6" clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['6']}/>
     
     <Button myid="subtract" value="-"  text="−" clickHandler={this.props.clickHandler} color={this.colors.operation}  keyState={this.props.keyStates['-']}/>
     <Button myid="one" value="1" clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['1']}/>
     <Button myid="two" value="2" clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['2']}/>
     <Button myid="three" value="3" clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['3']}/>
      <Button myid="add" value="+"  text="+" clickHandler={this.props.clickHandler}color={this.colors.operation}  keyState={this.props.keyStates['+']}/>
     <Button myid="zero" value="0" clickHandler={this.props.clickHandler} color={this.colors.number} span="2"  keyState={this.props.keyStates['0']}/>
     <Button myid="decimal" value="." clickHandler={this.props.clickHandler} color={this.colors.number}  keyState={this.props.keyStates['.']}/>
     
     
     <Button myid="equals" value="enter"  width="2" text="=" clickHandler={this.props.clickHandler} color={this.colors.operation}  keyState={this.props.keyStates.enter}/>
  </>
  );
}
}