import React, { Component } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Modal,
	ModalHeader,
	ModalBody
} from "reactstrap";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
			modal: false
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();
		// console.log(this.state.userName + " " + this.state.password);

		const user = {
			userName: this.state.userName,
			password: this.state.password
		};

		this.props.loginUser(user);
		this.toggle();
	};

	render() {
		return (
			<div body className="mb-4">
				<Button onClick={this.toggle}>Login</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="userName">User Name</Label>
								<Input
									type="text"
									name="userName"
									id="userName"
									placeholder="User Name"
									onChange={this.onChange}
									value={this.state.userName}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									onChange={this.onChange}
								/>
							</FormGroup>
							<Button color="dark" style={{ marginTop: "2rem " }} block>
								Sign Up
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.users.user
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
