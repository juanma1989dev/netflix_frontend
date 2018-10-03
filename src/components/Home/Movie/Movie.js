import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import './movie.css';

class Movie extends Component{
    render(){
        return(
            <div>
                <div className="col-md d-flex aling-items-strech mt-5">
                    <div className="card Movie_card" >
                        <img className="card-img-top" src={this.props.poster} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{this.props.title}</h5>
                            <Link className="btn btn-primary" to={`/movie/${this.props.id}`}>Ver</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie;