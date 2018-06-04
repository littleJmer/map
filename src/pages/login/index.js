import React, { Component } from "react";

import { connect } from 'react-redux'

class Login extends Component {

	constructor(props) {
		super(props)

		console.log(props);

		if (props.authenticated) {
			props.history.push({ pathname: '/app' });
		}
	}

	render() {
		return(
			<div>
				<label>Aqui bladimir hara magia</label>
			</div>
		)
	}

}

const mapStateToProps = (state, ownProps) => ({
	authenticated: state.auth.authenticated,
})

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

