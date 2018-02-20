import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



class App extends React.Component{
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    this.convertToCelsius = this.convertToCelsius.bind(this);
    this.convertToFahrenheit = this.convertToFahrenheit.bind(this);    
    this.state = {
      loading: true,
      zipcode: 10003,
      temp: 20,
      name: 'New York',
      humidity: 50,
      sunrise: 7,
      value: '',
      tempUnit: 'F'
    }
  }
  componentDidMount() {
  	let th = this;
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords.latitude, position.coords.longitude);
		let apiUrl = '//api.openweathermap.org/data/2.5/weather?APPID=4b8d06411db9758c752cb3889b3a220e&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial';
		axios.get(apiUrl).then(function (response) {
			//alert("clicked");
			console.log(th);
			console.log(response);		
			th.setState({loading: false, name: response.data.name, temp: response.data.main.temp, humidity: response.data.main.humidity})
			
		})
		.catch(function (error) {
			console.log(error);
		});  
	});
	} else {
	  /* geolocation IS NOT available */
	}

  }

  convertToFahrenheit() {
  	console.log("Is C")
    this.setState((prevState) => {
    // Important: read `prevState` instead of `this.state` when updating.
	    return {temp:  9/5*prevState.temp + 32, tempUnit: "F"}
	});
  }

  convertToCelsius() {
  	console.log("Is F")
    this.setState((prevState) => {
    // Important: read `prevState` instead of `this.state` when updating.
	    return {temp:  5/9*(prevState.temp-32), tempUnit: "C"}
	});    
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({zipcode: this.state.value});
    fetch(`//api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode}&APPID=4b8d06411db9758c752cb3889b3a220e&units=imperial`)
    .then(res => res.json())
    .then(res =>   
    this.setState({
      name: res.name,
      temp: res.main.temp,
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
    const isCelsius = this.state.tempUnit;
    console.log(this.state.tempUnit)
    let button = null;
    if (isCelsius === "C") {
      button = <LogoutButton onClick={this.convertToFahrenheit} />;
    } else {
      button = <LoginButton onClick={this.convertToCelsius} />;
    }

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
        <h2 id= 'temp'>Temp: {this.state.temp} {this.state.tempUnit};</h2>
        <h2>Humidity: {this.state.humidity}%</h2>
        {button}
     </div>
    )
    }
  }
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Convert To Celsius
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Convert To Fahrenheit
    </button>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

function initialize(){
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords.latitude, position.coords.longitude);
		let apiUrl = '//api.openweathermap.org/data/2.5/weather?APPID=4b8d06411db9758c752cb3889b3a220e&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial';
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








