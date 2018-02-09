import React from 'react';
import ReactDOM from 'react-dom';
import he from 'he';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import axios from 'axios';



const MyNavLinks = () => (
  <ToolbarGroup>
    <FlatButton label="Dashboard" labelStyle = {{color: "white"}}/>
    <FlatButton label="Settings" labelStyle = {{color: "white"}}/>
    <FlatButton label="Profile" labelStyle = {{color: "white"}}/>
  </ToolbarGroup> 
);

class App extends React.Component {
   render() {
      return (
      	<MuiThemeProvider>
      		 <div style = {this.props.styles}>
		         <div className="container">
		         	<AppBar style = {this.props.appBarStyle} title="Quotes of the day" iconElementRight={<MyNavLinks />} />
			         	<Card>
			         	<CardHeader titleStyle = {{fontSize: "2em",fontWeight: "bold"}} title= {this.props.title} titleColor = {this.props.titleColor} actAsExpander={true} showExpandableButton={true}/>	
			         	<Divider />
			            <CardText style = {{fontSize: "1.5em"}} color = {this.props.color}>{this.props.content}</CardText>		            
			            <CardActions>
			            	<div id = "button"></div>
			            	<div id = "socialbutton"></div>
			            </CardActions>
			            </Card>
		         </div>
	         </div>
         </MuiThemeProvider>
      );
   }
}

handleClick();

function handleClick(e){
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords.latitude, position.coords.longitude);
		let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=4b8d06411db9758c752cb3889b3a220e&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
		axios.get(apiUrl).then(function (response) {
			//alert("clicked");
			ReactDOM.render(
			<App styles = {{fontFamily: "'Futura URW',sans-serif"}} title={response.data[0].title} content = {he.decode(response.data[0].content).replace(/(<([^>]+)>)/ig,"")}/>,
			document.getElementById('app')
			);		
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

export default App;