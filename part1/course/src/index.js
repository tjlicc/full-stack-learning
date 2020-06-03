import React from 'react';
import ReactDOM from 'react-dom';
import { App as HelloWorld } from './hello-world';
import { App as State } from './state';
import { App as ComplexState } from './complex-state';
import { App as BestPractice } from './best-practice';

// ReactDOM.render(<HelloWorld />, document.querySelector('#root'));
// ReactDOM.render(<State />, document.querySelector('#root'));
// ReactDOM.render(<ComplexState />, document.querySelector('#root'));
ReactDOM.render(<BestPractice />, document.querySelector('#root'));