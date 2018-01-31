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
import TwitterButton from './TwitterButton.jsx';


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
	let rng = Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
	let apiUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_=" + rng;
	axios.get(apiUrl)
	.then(function (response) {
		//alert("clicked");
		//alert(response.data[0].content);
		let content = he.decode(response.data[0].content).replace(/(<([^>]+)>)/ig,"");
		let title = response.data[0].title;
		let twitter_url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + '"' + content + '" ' + title;
		let tumblr_url = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + title + '&content=' + content + '&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button'
		let urls = [encodeURI(twitter_url),encodeURI(tumblr_url)];
		ReactDOM.render(
		<TwitterButton urls = {urls} />,
		document.getElementById('socialbutton')
		);		
		ReactDOM.render(
		<App styles = {{fontFamily: "'Futura URW',sans-serif"}} title={response.data[0].title} content = {he.decode(response.data[0].content).replace(/(<([^>]+)>)/ig,"")}/>,
		document.getElementById('app')
		);
	})
	.catch(function (error) {
		console.log(error);
	});
}

export default App;