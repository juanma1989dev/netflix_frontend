import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const CREATE_USER = gql`
	mutation signup($name:String!, $lastname:String!, $email:String!, $password:String!, $birth_date:String!) {
		signup(
			email: $email,
			name: $name,
			lastname: $lastname,
			password: $password,
			birth_date: $birth_date
		){
			user{
				id,name
			},
			token
		}
	}
`
class Signup extends Component {

	constructor(props) {
		super(props);
		this.state= {
			email: "",
			name: "",
			lastname : "",
			password : "",
			birth_date : ""
		}


	}

	onInputChange = (event) =>{
		let {id, value} = event.target;
		this.setState({
			[id] : value
		})
	}
	
	onSubmit = (event, signup) => {
		event.preventDefault();
		signup({
			variables:{
				name: this.state.name,
				lastname: this.state.lastname,
				email: this.state.email,
				password: this.state.password,
				birth_date: this.state.birth_date
			}
		}).then(response =>{
			this.props.history.push('/login');
		}).catch(err => {
			console.log("todo mal")
		})
	}

	render() {
		return (
			<Mutation mutation={CREATE_USER}>
				{(signup, {data})=>(
					<div>  
						<form onSubmit={(e) => this.onSubmit(e, signup)}>
							<div className="form-group">
								<label>Email address</label>
								<input type="email" className="form-control"  placeholder="Enter email" 
									id="email" onChange={this.onInputChange}
									value={this.state.email}
								/>
							</div>
		
							<div className="form-group">
								<label>Name</label>
								<input type="text" className="form-control"  placeholder="Enter Name" 
									id="name" onChange={this.onInputChange}
									value={this.state.name}
								/>
							</div>
		
							<div className="form-group">
								<label>LastName</label>
								<input type="text" className="form-control"  placeholder="Enter LastName" 
									id="lastname" onChange={this.onInputChange}
									value={this.state.lastname}
								/>
							</div>
		
							<div className="form-group">
								<label>Birth Date</label>
								<input type="text" className="form-control"  placeholder="Enter Birth date" 
									id="birth_date" onChange={this.onInputChange}
									value={this.state.birth_date}
								/>
							</div>
		
							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control"  placeholder="Enter Password" 
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

export default Signup;
