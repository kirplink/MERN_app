import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
	render() {
		return (
			<Router>
				<Provider store={store}>
					<div className="App">
						<AppNavbar />
						<Container>
							<Route exact path="/" component={Home} />
						</Container>
					</div>
				</Provider>
			</Router>
		);
	}
}

export default App;
