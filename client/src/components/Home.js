import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { verifyUser, logout } from "../actions/userActions";
import SignUp from "./SignUp";
import Login from "./Login";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: ""
		};
	}

	componentDidMount() {
		this.props.verifyUser();
	}

	componentWillUpdate(prevProps) {
		// console.log(prevProps);
		console.log(this.props);
		if (this.state.currentUser !== prevProps.user.userName) {
			this.setState((state, props) => ({
				currentUser: props.user.userName
			}));
		}
	}

	render() {
		if (this.state.currentUser) {
			return (
				<div>
					<p>Welcome, {this.state.currentUser}</p>
					<Button className="mx-2" onClick={this.props.logout}>
						Logout
					</Button>
				</div>
			);
		} else {
			return (
				<div>
					<Login />
					<SignUp />
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
	user: state.users.user
});

export default connect(
	mapStateToProps,
	{ verifyUser, logout }
)(Home);
