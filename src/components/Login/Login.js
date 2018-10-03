
import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const MUTATION_LOGIN = gql`
  mutation login($email:String!, $password:String!) {
    login(
      email: $email ,
      password: $password,
    ){
      token,
      user{
        name
      }
    }
  }
`

class Login extends Component {
  
	constructor(props){
		super(props);
		this.state= {
		email: "",
		password: ""
		}
	}

	onInputChange = (event) => {
		console.log("me ejecute")
		let {id, value} = event.target;
		this.setState({
			[id] : value
		})

	}

	onSubmit = (event, login) => {
		event.preventDefault();
		login({
			variables: {
				email : this.state.email,
				password: this.state.password
			}
		}).then(response => {
			localStorage.setItem("token", response.data.login.token)
			this.props.history.push('/')
		}).catch(err => {
			console.log("Error : ", err)
		})
	}

	render() {
		return (
		<Mutation mutation={MUTATION_LOGIN}>{
		(login, {data}) => (
			<div>  
				<form onSubmit={(e) => this.onSubmit(e, login)}>
					<div className="form-group">
						<label>Email address</label>
						<input type="email" className="form-control"  placeholder="Enter email" 
							id="email" onChange={this.onInputChange}
							value={this.state.email}
						/>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control"  placeholder="Enter password" 
							id="password" onChange={this.onInputChange}
							value={this.state.password}
						/>
					</div>

					<button type="submit" className="btn btn-success">Registrarme</button>
				</form>
			</div>
			
		)}
		</Mutation>
		);
	}
}

export default Login;
