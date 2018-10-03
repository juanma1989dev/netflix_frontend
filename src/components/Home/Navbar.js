import React, {Component} from 'react'
import './navbar.css';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/me">
                    <h4 className="Navbar__name">Hola {this.props.name}</h4>
                </Link>
            </nav>
        )
    }
}

export default Navbar;