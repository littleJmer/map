import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import * as actions from '../../actions/auth.js';

class Login extends Component {

	constructor(props) {
		super(props)

		console.log(props);

		this.state ={
			text : '',
			logedfb : '',
			name : '',
			access_token : '',
		}

		
		this.loginfb = this.loginfb.bind(this);
	}

	componentDidMount()
    {
   //  	let self = this;
   //  		if(window.FB !==  undefined){
	  //       window.FB.getLoginStatus(function(response) {
			//     console.log(response)
			//     if(response.status === "connected"){
			//     	window.FB.api('/me?fields=id,name,email', function(response) {
			//     		console.log(response)
			// 		       self.setState({
			// 			    	correo : response.email,
			// 			    	name : response.name,
			// 			    	access_token : response.accessToken
			// 			    })
			// 		     });
			// 	    self.setState({
			// 	    	text : 'Continue with Facebook',
			// 	    	loginfb : true,
			// 	    })
			// 	}else{
			//     	self.setState({
			// 		    	text : 'Login With Facebook',
			// 		    	loginfb : false,
			// 		    })
			//     	console.log('not loged')
			//     }
			// });
	  //   }
    }

    loginfb(){
   //  	let {loginfb, correo , name , access_token} = this.state;
   //  	let _self = this;

   //  	if(!loginfb){
			// window.FB.login(function(response) {
			// 	console.log(response)
			//    	if (response.authResponse) {
			//    		let token = response.authResponse.accessToken;
			//    		let email; 
			//      	console.log('Welcome!  Fetching your information.... ');
			//      	window.FB.api('/me?fields=id,name,email', function(response) {
			// 	     	console.log(response)
			// 	     	email = response.email;
			// 	       console.log('Good to see you, ' + response.name + '.' + response.email);
			// 	       _self.props.signin();
			//      });
			//    	} else {
			//      console.log('User cancelled login or did not fully authorize.');
			//    }
			//  });
   //  	}else{
    		console.log()
    		this.props.signin();
    	// }
	}	

	render() {
		const { from } = this.props.location.state || { from: { pathname: "/app" } };

		if(this.props.authenticated)
			return <Redirect to={from} />;

		return(
			<div>
				<label>Aqui chino hizo magia</label>
				<button onClick={this.loginfb} style={styles.colorFB}>{this.state.text}</button>
			</div>
		)
	}

}

const styles = {

	container: {
		width: '100%',
		height: '100vh',
	},

	wrapper: {
		display: 'flex',
		height: '100%',
	},

	loginForm: {
		width: '60%'
	},

	colorFB :{
		background : '#4267b2'
	},

	title: {
		textAlign: 'center',
		fontSize: '27px',
		marginBottom: '2em'
	},

	input: {
		fontSize: '18px',
		display: 'block',
		width: '100%',
		padding: '6px 12px',
		borderRadius: '6px',
		border: 'solid 1px #ACACAC',
		color: '#ACACAC',
		marginBottom: '1.5em',
	},

	rightside: {
		flex: '1',
		backgroundImage: 'url('+''+')',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'right top',
	}

};

const mapStateToProps = (state, ownProps) => ({
	authenticated: state.auth.authenticated,
})

//const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	// mapDispatchToProps,
	actions,
)(Login)

