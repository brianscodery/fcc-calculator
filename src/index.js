import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';

ReactDOM.render(<Calculator />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


WebFont.load({
  google: {
    families: ['Orbitron: 500,700', 'sans-serif']
  }
});