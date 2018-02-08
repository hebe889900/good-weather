import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import he from 'he';
import App from './App.jsx';
import TwitterButton from './TwitterButton.jsx';

const colors = [["#212121","#E57373"],["#880E4F","#F06292"],["#4A148C","#BA68C8"],["#1A237E","#5C6BC0"],["#006064","#42A5F5"],["#004D40","#039BE5"],["#827717","#43A047"],["#E65100","#43A047"],["#BF360C","#43A047"],["#263238","#43A047"]];
console.log(colors.length)

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  let apiUrl = 'api.openweathermap.org/data/2.5/weather&APPID=4b8d06411db9758c752cb3889b3a220e&lat=35&lon=139'
});
} else {
  /* geolocation IS NOT available */
}

class QuoteButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.

  render() {
    return (
    <MuiThemeProvider>
      <RaisedButton onClick={handleClick}  labelColor = {"#FFFFFf"} label="New Quote" backgroundColor = {this.props.backgroundColor} />
      < /MuiThemeProvider>
    );
  }
  componentDidMount(){
  	console.log("Did mount")
  	document.body.style.backgroudColor = "#B71C1C";
  }
}

function handleClick(e){
	let rng = Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
	let rngColor = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
	console.log(rngColor)
	let color = colors[rngColor][0];
	const style = {
	  color: 'white',
	};
	ReactDOM.render(
		<QuoteButton backgroundColor={color}/>,
		document.getElementById('button')
	);
	let apiUrl = 'api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4b8d06411db9758c752cb3889b3a220e' + rng;
	axios.get(apiUrl)
	.then(function (response) {
		//alert("clicked");
		//alert(response.data[0].content);
		let content = '"' + he.decode(response.data[0].content).replace(/(<([^>]+)>)/ig,"") + '"';
		let title = response.data[0].title;
		let twitter_url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + '"' + content + '" ' + title;
		let tumblr_url = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + title + '&content=' + content + '&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button'
		let urls = [encodeURI(twitter_url),encodeURI(tumblr_url)];
		console.log(urls);
		ReactDOM.render(
		<App appBarStyle = {{backgroundColor:color}} styles = {{backgroundColor:color}} color = {color} titleColor = {color} title={response.data[0].title} content = {content}/>,
		document.getElementById('app')
		);


		console.log(document.body)
		ReactDOM.render(
		<TwitterButton urls = {urls} />,
		document.getElementById('socialbutton')
		);		
	})
	.catch(function (error) {
		console.log(error);
	});
}

export default QuoteButton;