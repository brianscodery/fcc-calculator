import React from 'react';
export default class Display extends React.Component {

  // format = (value) => {
  //   const valueString = value.toString();
  //   const decimalExists = valueString.includes('.');
  //   if (!decimalExists) {
  //     return valueString.replace(/\B(?=(\d{3})+(?!\d))/g,',');
  //   }
  //   const [wholeNumber, decimal] = valueString.split('.');
  //   const decimalString = decimal ? `${decimal}` : '';
  //      return (
  //       wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g,',') + 
  //       '.' +
  //       decimalString
  //         .split('')
  //         .reverse()
  //         .join('')
  //         .replace(/\B(?=(\d{3})+(?!\d))/g,' ')
  //         .split('')
  //         .reverse()
  //         .join('')
  //      );
  // };

  render() {
    const displayScreenStyle = {
      width: '100%',
      height: '100%',
      background: 'black',
      margin: '10px',
      gridColumn: '1 / span 4',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      textAlign: 'right'
    };

    const queueStringStyle = {
    padding: '10px',
      width: '95%',
      height: '30px',
      color: 'white',
      fontSize: '25px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    };

    const displayValStyle = {
    padding: '10px',
    color: 'white',
fontSize: '50px',
    };
  return (
    
  <div style={displayScreenStyle}>
   <div style={queueStringStyle}> {this.props.queue.join(' ')}</div> 
    <div style={displayValStyle} id="display"> {this.props.input} </div>
  </div>
  );
}
}