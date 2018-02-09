import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';


InitializePage();

function InitializePage(){
	ReactDOM.render(<App />, document.getElementById('app'));
}




