import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'; //link let us go from page to page without refreshing pages

import {UserContext} from '../App';

const NavBar = () => {
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);
    const renderList = () => {
        if(state){
            return(
                [
                    <li key={1}><Link to="/profile">Profile</Link></li>,
                    <li key={2}><Link to="/create">Create Post</Link></li>,
                    <li key={3}>
                    <button onClick={() => {
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push('/signin')
                        }
                    }
                      className="btn waves-effect waves-light #c62828 red darken-3">Logout
                        <i className="material-icons right"></i>
                      </button>
                    </li>
                ]
            )
        }else{
            return(
                [
                    <li key={4}><Link to="/signin">Signin</Link></li>,
                    <li key={5}><Link to="/signup">Signup</Link></li>
                ]
            )
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
                <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;