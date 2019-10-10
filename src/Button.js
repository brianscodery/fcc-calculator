import React from 'react';
import styled from 'styled-components';

export default class Button extends React.Component {
 
 buttonStyle = {
  background: this.props.color,
  borderRadius: '35px',
  border: 'none',
  color: this.props.color === '#d4d4d2' ? '#1c1c1c' : 'white',
  width: '100%',
  height: '100%',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: '2rem',
  gridColumn: `span ${this.props.span || '1'}`,
  outline: 'none'
  }



render() {

  
    return (
      <button 
        style={this.buttonStyle}
        value={this.props.value} 
        onClick={this.props.clickHandler}
        id={this.props.myid}
        className={this.props.keyState ? 'pressed' : ''}
      >
        {this.props.text || this.props.value}
      </button>
    );
  }
}