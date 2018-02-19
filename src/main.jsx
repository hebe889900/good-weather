import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      zipcode: 10003,
      temp: 20,
      name: 'New York',
      humidity: 50,
      sunrise: 7,
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  	let th = this;
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords.latitude, position.coords.longitude);
		let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=4b8d06411db9758c752cb3889b3a220e&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
		axios.get(apiUrl).then(function (response) {
			//alert("clicked");
			console.log(th);
			console.log(response);		
			th.setState({loading: false, name: response.data.name, temp: Math.round(parseInt((response.data.main.temp)- 273)*9/5 +32), humidity: response.data.main.humidity})
			
		})
		.catch(function (error) {
			console.log(error);
		});  
	});
	} else {
	  /* geolocation IS NOT available */
	}

  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({zipcode: this.state.value});
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode}&appid=4398ca985b90b09bb540560e9dd6b60e`)
    .then(res => res.json())
    .then(res =>   
    this.setState({
      name: res.name,
      temp: Math.round(parseInt((res.main.temp)- 273)*9/5 +32),
      humidity: res.main.humidity
    })
    )
    if (this.state.temp > 80){
      document.getElementById('temp').style.color = 'red'
    }
    else if (this.state.temp < 50){
      document.getElementById('temp').style.color = 'blue'
    }
  }
  render(){
    if (this.state.loading) {
      return(<div>Loading...</div>);
    } else {
    return (
    <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          <h1>Enter zip and press enter</h1>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
        <h1>City: {this.state.name}</h1>
        <h2 id= 'temp'>Temp: {this.state.temp} &#x2109;</h2>
        <h2>Humidity: {this.state.humidity}%</h2>
     </div>
    )
    }
  }
}



ReactDOM.render(<App />, document.getElementById('root'));

function initialize(){
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords.latitude, position.coords.longitude);
		let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=4b8d06411db9758c752cb3889b3a220e&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
		axios.get(apiUrl).then(function (response) {
			//alert("clicked");
			console.log(response);					
		})
		.catch(function (error) {
			console.log(error);
		});  
	});
	} else {
	  /* geolocation IS NOT available */
	}	
}








