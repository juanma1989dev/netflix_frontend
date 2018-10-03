import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';


const MUTATION_ME = gql`
    mutation updateUser(
        $name:String!
        $lastname:String!
        $password:String!
        $birth_date:String!
        $gender:Genders
        $avatar:String!

    ){
        updateUser(
            name: $name,
            lastname: $lastname,
            password: $password,
            birth_date: $birth_date,
            gender: $gender,
            avatar: $avatar
        ){
            id,
            name,
            avatar,
            gender
        }
    }
`

class FormMe extends Component {

    constructor(props) {
        super(props)
        this.state = {...props.data}
    }

    handleInput = (event) => {
        let {name, value} = event.target

        this.setState({ [name]: value} )
    }

    formSubmit = (e, updateUser) => {
        e.preventDefault();
        console.log("state", this.state)
        updateUser({
            variables: {...this.state}
        })
    }

    uploadFile = async (filename) => {
        let url = await Firebase.storage().ref('avatars').child(filename).getDownloadURL() 
        this.setState({ avatar : url })
    }

    render(){
        return(
            <Mutation mutation={MUTATION_ME}>
            {
                (updateUser, {data}) => (
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <img src={this.state.avatar} className="img-fluid img-rounded" />
                        <form onSubmit={(e) => this.formSubmit(e, updateUser)}>
                            <div className="form-group">
                                <label>Name :</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInput}></input>
                            </div>
    
                            <div className="form-group">
                                <label>Lastname :</label>
                                <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleInput}></input>   
                            </div>
    
                            <div className="form-group">
                                <label>Birth date :</label>
                                <input type="text" className="form-control" name="birth_date" value={this.state.birth_date} onChange={this.handleInput}></input>   
                            </div>
    
                            <div className="form-group">
                                <label>Gender :</label>
                                <select name="gender" className="form-control" value={this.state.gender} onChange={this.handleInput}>
                                    <option value="H">Man</option>
                                    <option value="MN">Woman</option>
                                </select>
                            </div>
    
                            <div className="form-group">
                                <label>Email :</label>
                                <input type="text" className="form-control" name="birth_date" value={this.state.email} disabled ></input>   
                            </div>
    
                            <div className="form-group">
                                <label className="btn btn-danger">Avatar
                                    <FileUploader
                                        hidden
                                        accept="image/*"
                                        randomizeFilename
                                        storageRef={
                                            Firebase.storage().ref('avatars')
                                        }
                                        onUploadError={(err) => console.log(err) }
                                        onUploadSuccess={this.uploadFile}
                                    />
                                </label>
                            </div>

                            <button className="btn btn-success" type="submit"> Save </button>
    
                        </form>
                    </div>
                </div>
                )
            }
            </Mutation>
        )
    }

}

export default FormMe;