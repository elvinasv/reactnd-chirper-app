import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                         <NavLink to='/new' activeClassName="active">
                            New Tweet
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
