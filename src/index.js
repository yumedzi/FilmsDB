import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App name="Pulp Fiction" 
                     rating="super" genres="action,   comedy" 
                     actors="John Travolta, Uma Thurman,  bruce willis,samuel l. jackson" 
                     description="The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption." 
                />, document.getElementById('root'));
registerServiceWorker();
