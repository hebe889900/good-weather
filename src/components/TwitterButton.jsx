import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon, SocialIcons} from 'react-social-icons';
import App from './App.jsx';



class TwitterButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.

  render() {
    return (
		<SocialIcons urls={this.props.urls} />
    );
  }
}



export default TwitterButton;