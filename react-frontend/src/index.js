import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root'

// TO-DO
// if (process.env.NODE_ENV !== "development")
//     console.log = () => {};

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);
