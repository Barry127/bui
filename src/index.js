import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './docs/Docs';
import * as serviceWorker from './serviceWorker';

import '@barry127/bui-feather-icons';

import './index.css';

ReactDOM.render(<Docs />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
