
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.module.css';
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop';

class Profile extends Component{

    state = {
        user: null,
        isLoading: true,
        showBackdrop: false
    }

    componentDidMount(){
        fetch('http://localhost:8080/my-profile', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => {
            return result.json();
        })
        .then(result => {
            console.log('Result is ', result);
            this.setState({user: result.user, isLoading: false});
        })
        .catch(err => {
            console.log('Error in Profile', err);
            this.setState({isLoading: false});
        })
    }

    cancelDeleteHandler = () => {
        this.setState({showBackdrop: false});
    }

    proceedInitialDeleteHandler = () => {
        this.setState({showBackdrop: true});
    }

    cancelFinalDeleteHandler = () => {
        this.setState({showBackdrop: false});
    }

    proceedFinalDeleteHandler = () => {
        fetch('http://localhost:8080/delete-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => {
            return result.json();
        })
        .then(result => {
            console.log('Result is ', result);
            // this.setState({user: result.user, isLoading: false});
        })
        .catch(err => {
            console.log('Error in deleting account', err);
            // this.setState({isLoading: false});
        })
        
    }

    render(){

        let backdrop = null;
        if(this.state.showBackdrop){
            backdrop = <Backdrop clicked={this.cancelDeleteHandler}/>
        }

        let modal = null;
        if(this.state.showBackdrop){
            modal = (
                <div className={classes.Modal}>
                    <p>Are you sure you want to delete your account?</p>
                    <p>This action can not be undone.</p>
                    <button className={classes.EditButton} onClick={this.cancelDeleteHandler}>Cancel</button>
                    <button className={classes.DeleteButton} onClick={this.proceedFinalDeleteHandler}>Delete</button>
                </div>
            )
        }
         
        return(
            <div className={classes.RootContainer}>
                {backdrop}
                {modal}
                {this.state.isLoading ? <Spinner /> : (
                    <React.Fragment>
                        <img src={this.state.user.imageUrl} alt='userProfilePic'/>
                        <div className={classes.InfoContainer}>
                            <p>{this.state.user.username}</p>
                            <p>{this.state.user.name}</p>
                            <p>Email: {this.state.user.email}</p>
                        </div>
                        <button 
                            className={classes.EditButton}
                            onClick={this.cancelDeleteHandler}>Edit Details</button>
                        <button 
                            className={classes.DeleteButton}
                            onClick={this.proceedInitialDeleteHandler}>Delete Account</button>
                    </React.Fragment>
                ) }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return{
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Profile);