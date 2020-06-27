
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button} from 'semantic-ui-react';

import classes from './Profile.module.css';
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop';

class Profile extends Component{

    state = {
        user: null,
        isLoading: true,
        showBackdrop: false,
        isDelete: false,
        isEdit: false,
        isEditing: false,
        userInfo: {
            email: '',
            name: '',
            username: ''
        },
        error: ''
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
            this.setState({user: result.user, isLoading: false, userInfo: {name: result.user.name, username: result.user.username, email: result.user.email}});
        })
        .catch(err => {
            console.log('Error in Profile', err);
            this.setState({isLoading: false});
        })
    }

    hideModalAndBackdrop = () => {
        this.setState({showBackdrop: false, isDelete: false, isEdit: false});
    }

    proceedInitialDeleteHandler = () => {
        this.setState({showBackdrop: true, isDelete: true});
    }

    proceedInitialEditHandler = () => {
        const { name, username, email } = this.state.user;
        this.setState({showBackdrop: true, 
            isEdit: true,
            userInfo: {
                name: name, 
                username: username, 
                email: email
            }
        });
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
            this.setState({user: result.user,
                userInfo: {
                    name: result.user.name, 
                    username: result.user.username, 
                    email: result.user.email
                }
            });
            // this.setState({user: result.user, isLoading: false});
        })
        .catch(err => {
            console.log('Error in deleting account', err);
            // this.setState({isLoading: false});
        })
        
    }

    proceedFinalEditHandler = () => {
        this.setState({isEditing: true});
        fetch('http://localhost:8080/edit-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                name: this.state.userInfo.name,
                username: this.state.userInfo.username,
                email: this.state.userInfo.email
            })
        })
        .then(result => {
            return result.json();
        })
        .then(result => {
            console.log('Result is ', result);
            this.setState({user: result.user,
                userInfo: {
                    name: result.user.name, 
                    username: result.user.username, 
                    email: result.user.email
                },
                isEditing: false
            });
            this.hideModalAndBackdrop();
        })
        .catch(err => {
            this.setState({isEditing: false});
            console.log('Error in editing account info', err);
        })
    }

    formInputChangeHandler = (event) => {
        this.setState({error: ''});
        const updatedUserInfo = {...this.state.userInfo};
        updatedUserInfo[event.target.name] = event.target.value;
        this.setState({userInfo: updatedUserInfo});
    }

    render(){

        let backdrop = null;
        if(this.state.showBackdrop){
            backdrop = <Backdrop clicked={this.hideModalAndBackdrop}/>
        }

        let modal = null;
        if(this.state.isDelete){
            modal = (
                <div className={classes.Modal}>
                    <p>Are you sure you want to delete your account?</p>
                    <p>This action can not be undone.</p>
                    <Button 
                        loading={this.state.isEditing}
                        className={classes.EditButton} 
                        color='green'
                        onClick={this.hideModalAndBackdrop}>
                        Cancel
                    </Button>
                    <button className={classes.DeleteButton} onClick={this.proceedFinalDeleteHandler}>Delete</button>
                </div>
            )
        }

        let editForm = null;
        if(this.state.isEdit){
            editForm = (
                <div className={classes.EditForm}>
                    <h1 style={{marginBottom: '2rem'}}>EDIT DETAILS</h1>
                    <Input
                        fluid
                        icon='user'
                        iconPosition='left' 
                        name='name'
                        type='text'
                        placeholder='Your Name'
                        value={this.state.userInfo.name}
                        style={{marginBottom: '8px'}}
                        onChange={this.formInputChangeHandler}/>

                    <Input
                        fluid
                        icon='user'
                        iconPosition='left' 
                        name='username'
                        type='text'
                        placeholder='Username'
                        value={this.state.userInfo.username}
                        style={{marginBottom: '8px'}}
                        onChange={this.formInputChangeHandler}/>

                    <Input
                        fluid
                        icon='mail'
                        iconPosition='left' 
                        name='email'
                        type='email'
                        placeholder='Your E-mail'
                        value={this.state.userInfo.email}
                        style={{marginBottom: '8px'}}
                        onChange={this.formInputChangeHandler}/>

                    {/* {error} */}

                    <button className={classes.EditButton} onClick={this.proceedFinalEditHandler}>Edit</button>
                    <button className={classes.DeleteButton} onClick={this.hideModalAndBackdrop}>Cancel</button>
                </div>
            )
        }
         
        return(
            <div className={classes.RootContainer}>
                {backdrop}
                {modal}
                {editForm}
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
                            onClick={this.proceedInitialEditHandler}>Edit Details</button>
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