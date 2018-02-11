import React from 'react';
import ReactDOM from 'react-dom';
import FilterableProductTable from './components/App.jsx';
import axios from 'axios';





const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
initialize();


function initialize(){
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords.latitude, position.coords.longitude);
		let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=4b8d06411db9758c752cb3889b3a220e&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
		axios.get(apiUrl).then(function (response) {
			//alert("clicked");
			console.log(response);	

			ReactDOM.render(<FilterableProductTable products = {response} />, document.getElementById('app'));		
		})
		.catch(function (error) {
			console.log(error);
		});  
	});
	} else {
	  /* geolocation IS NOT available */
	}	
}








