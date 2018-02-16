import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';






// CurrentWeather passes data to the weather header and the weather summary
class CurrentWeather extends React.Component {
    render() {
        return (
            <div className="z-depth-3 white">
                <WeatherHeader weather={this.props.weather} units={this.props.units} onClick={this.props.onClick}/>
                <WeatherSummary weather={this.props.weather}/>
            </div>
        )
    }
}

// Main header for current weather.
function WeatherHeader(props) {
    let icon = "wi wi-large wi-forecast-io-" + props.weather.icon
    return (
        <div className="white center-align">
            <h1>{Math.ceil(props.weather.temperature)}° {props.units}</h1>
            <i className={icon}></i>
            <p>{props.weather.summary}</p>
            <div className="switch">
                <label>
                    F
                    <input type="checkbox" onClick={props.onClick}/>
                    <span className="lever"></span>
                    C
                </label>
            </div>
        </div>
    )
}

// Shows the details about the current weather.
function WeatherSummary(props) {
    return (
        <div>
            <table className="striped">
                <tbody>
                    <tr>
                        <td>Humidity: {Math.ceil(props.weather.humidity * 100)}%</td>
                        <td>Cloud cover: {Math.ceil(props.weather.cloudCover * 100)}%</td>
                    </tr>
                    <tr>
                        <td>Chance of precipitation: {props.weather.precipProbability * 100}%</td>
                        <td>Closest storm distance: {props.weather.nearestStormDistance}
                            miles</td>
                    </tr>
                    <tr>
                        <td>Wind Speed: {Math.ceil(props.weather.windSpeed)}
                            mph</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

// Graph of the weather over the next 24 hours
// Hourly > HourData
class Hourly extends React.Component {
    render() {
        let result = this.props.weather.data.map(function(hour) {
            return hour.temperature
        })
        let hourlyData = this.props.weather.data.map(function(hour) {
            return <HourData weather={hour}/>
        })
        hourlyData = hourlyData.slice(1, 7)
        return (
            <div className="z-depth-3 white">
                <h3>Next 24 hours</h3>
                <Trend smooth autoDraw autoDrawDuration={3000} autoDrawEasing="ease-out" data={result} gradient={['#42b3f4']} radius={7.7} strokeWidth={5} strokeLinecap={'butt'}/>

                <div className="row">
                    {hourlyData}
                </div>
            </div>
        )
    }
}

class HourData extends React.Component {
    render() {
        let d = moment.unix(this.props.weather.time).fromNow(true)
        let icon = "wi wi-small wi-forecast-io-" + this.props.weather.icon
        return (
            <div className="col m2 s4">
                <p>
                    <b>In {d}:</b>
                </p>
                <i className={icon}></i>
                <p>{Math.ceil(this.props.weather.temperature)}°</p>
            </div>
        )
    }
}

// Graph of the data over the next week.
// Daily > DayData
class Daily extends React.Component {
    render() {
        let temperatures = new Array
        let result = this.props.weather.data.map(function(day) {
            temperatures.push(day.temperatureMin)
            temperatures.push(day.temperatureMax)
        })
        let dailyData = this.props.weather.data.map(function(day) {
            return <DayData weather={day}/>
        })
        dailyData = dailyData.slice(1, 8)
        return (
            <div className="z-depth-3 white">
                <h3>Next 7 Days</h3>
                <Trend smooth autoDraw autoDrawDuration={3000} autoDrawEasing="ease-out" data={temperatures} gradient={['#42b3f4']} radius={7.7} strokeWidth={5} strokeLinecap={'butt'}/> {dailyData}
            </div>
        )
    }
}

class DayData extends React.Component {
    render() {
        let d = moment.unix(this.props.weather.time).format('dddd')
        return (
            <div>
                <p>
                    <b>{d}:</b>
                    {this.props.weather.summary}</p>
            </div>
        )
    }
}

//App > CurrentWeather > Head > WeatherData
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: {},
            data: false,
            units: "F"
        }
        this.switchUnits = this.switchUnits.bind(this)
    }

    componentDidMount() {
        this.getLocationAndWeather()
    }

    switchUnits() {
        if (this.state.units == "F") {
            this.setState({units: "C"})
        } else {
            this.setState({units: "F"})
        }
        this.getLocationAndWeather()
    }

    getLocationAndWeather() {
        let th = this
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                let lat = pos.coords.latitude
                let lon = pos.coords.longitude
                let units = (th.state.units == "F"
                    ? "us"
                    : "si")
                let loc = lat + "," + lon + "?units=" + units
                let url = "https://api.darksky.net/forecast/04c3762b193aaee40affb899992cef3e/" + loc
                axios.get(url).then(function(response) {
                    return response.json()
                }).then(function(json) {
                    th.setState({data: true, weather: json})
                })
            })
        }
    }

    render() {
        if (this.state.data) {
            return (
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <CurrentWeather weather={this.state.weather.currently} onClick={this.switchUnits} units={this.state.units}/>
                        <Hourly weather={this.state.weather.hourly} units={this.state.units}/>
                        <Daily weather={this.state.weather.daily}/>
                      <p>Powered by <a href="https://darksky.net/poweredby/">DarkSky</a></p>
                    </div>
                
                </div>
            )
        } else {
            return <div></div>;
        }
    }
};

ReactDOM.render(
  <App/>, document.getElementById('root'));


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








