import React from 'react';
import ReactDOM from 'react-dom';
import { Flux } from 'fluxxor';
import './style/main.less';
import AgentHandler from './AgentHandler';
import Main from './components/Main';
import actions from './actions';
import stores from './stores';


const flux = new Flux(stores, actions);
new AgentHandler(flux);

window.addEventListener('load', function() {
  ReactDOM.render(<Main flux={flux}/>, document.getElementById('root'));
}, false);
