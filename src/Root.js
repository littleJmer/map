import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import App from "./pages/app";

class Root extends Component {

	render() {
		return(
			<Router>
				<HashRouter>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/app" component={App} />
					</Switch>
				</HashRouter>
			</Router>
		)
	}

}

export default Root;


