
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Navbar.module.css';
import AppIcon from '../../assets/images/icon3.jpg';
import { Button } from 'semantic-ui-react';

const onHamburgerMenuClick = () => {
    const sidebar = document.getElementById('side-bar');
    if( sidebar.style.display === 'none' ){
        sidebar.style.display = 'flex';
    }
    else{
        sidebar.style.display = 'none';
    }
}

const navBar = (props) => {
    const { isAuth } = props;

    const links = (
        <div className={classes.LinksContainer}>
            { isAuth ? <div className={classes.NavbarLink}>Bharti</div> : null }
            { isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Feed</NavLink> : null }
            { isAuth ? <NavLink to='/add-post' className={classes.NavbarLink}>Add Post</NavLink> : null }
            { isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Saved</NavLink> : null }
            { isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Notifications</NavLink> : null }
            { !isAuth ? <NavLink to='/login' className={classes.NavbarLink}>Login</NavLink> : null }
            { !isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Signup</NavLink> : null }
            { isAuth ? <button className={classes.NavbarButton} onClick={props.setStatusToLogout}>Logout</button> : null }
        </div>
    )
    return(
        <React.Fragment>
            <div className={classes.RootContainer}>
                <div className={classes.IconContainer}>
                    <img src={AppIcon} alt='MainIcon' />
                </div>
                {links}
                <div className={classes.HamburgerMenu} onClick={onHamburgerMenuClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={classes.SideBar} id='side-bar'>
                <div>
                    { isAuth ? <div className={classes.NavbarLink}>Bharti</div> : null }
                    { isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Feed</NavLink> : null }
                    { isAuth ? <NavLink to='/add-post' className={classes.NavbarLink}>Add Post</NavLink> : null }
                    { isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Saved</NavLink> : null }
                    { isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Notifications</NavLink> : null }
                    { !isAuth ? <NavLink to='/login' className={classes.NavbarLink}>Login</NavLink> : null }
                    { !isAuth ? <NavLink to='/signup' className={classes.NavbarLink}>Signup</NavLink> : null }
                    { isAuth ? <button className={classes.NavbarButton} onClick={props.setStatusToLogout}>Logout</button> : null }
                </div>
            </div>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(navBar);