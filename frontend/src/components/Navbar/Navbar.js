
import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';
import AppIcon from '../../assets/images/icon3.jpg';

const navBar = (props) => {
    return(
        <div className={classes.RootContainer}>
            <div className={classes.IconContainer}>
                <img src={AppIcon} alt='MainIcon' />
            </div>
            <div className={classes.LinksContainer}>
                <NavLink to='/login' className={classes.NavbarLink}>Login</NavLink>
                <NavLink to='/signup' className={classes.NavbarLink}>Signup</NavLink>
            </div>
        </div>
    )
};

export default navBar;