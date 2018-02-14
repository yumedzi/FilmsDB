import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App name="Pulp Fiction" rating="8.9" jenre="action" actors="John Travolta, Uma Thurman, Samuel L. Jackson " />, document.getElementById('root'));
registerServiceWorker();
