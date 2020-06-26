
import React, { Component } from 'react';
import { Button, Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';

import classes from './Chats.module.css';
import User from './User/User';
import Spinner from '../Spinner2/Spinner2';

const selectCategoryHandler = () => {
    console.log('Clicked');
    const chats = document.getElementById('chats');
    const search = document.getElementById('search');
    const chatsContainer = document.getElementById('chats-container');
    const usersContainer = document.getElementById('users-container');

    chats.classList.toggle(classes.Test);
    search.classList.toggle(classes.Test);

    chatsContainer.classList.toggle(classes.DisplayContainer);
    usersContainer.classList.toggle(classes.DisplayContainer);

    chatsContainer.classList.toggle(classes.HideContainer);
    usersContainer.classList.toggle(classes.HideContainer);

}

class Chats extends Component{

    state = {
        users: [],
        isLoading: false
    }

    findPeopleClickHandler = () => {
        selectCategoryHandler();
        this.setState({isLoading: true});
        console.log('reached here');
        fetch('http://localhost:8080/users', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => {
            console.log('Result 1', result);
            return result.json();
        })
        .then(result => {
            console.log('Result 2', result);
            console.log(result.users);
            this.setState({users: result.users, isLoading: false});
        })
        .catch(err => {
            console.log('Error in Chats component', err);
            this.setState({isLoading: false});
        })
    }

    getId = (id1, id2) => {
        if(id1 < id2){
            return id1 + '-' +  id2;
        }
        return id2 + '-' + id1;
    }

    sendMessageHandler = (receiverId) => {
        const path = this.getId(this.props.user.id, receiverId);
        this.props.history.push('/chats/private/' + path);
    }

    render(){
        let users = this.state.users.map(user => {
            return(
                <User key={user._id} user={user} sendMessage={() => this.sendMessageHandler(user._id)}/>
            )
        })

        if(this.state.isLoading){
            users = <Spinner />
        }
        return(
            <div className={classes.RootContainer}>
                <div 
                    className={[classes.ChatTitle, classes.Test].join(' ')} 
                    id='chats' onClick={selectCategoryHandler}>
                    Chats
                </div>
                <div 
                    className={classes.SearchTitle} 
                    id='search' onClick={this.findPeopleClickHandler}>
                    Find People
                </div>
                <div 
                    className={[classes.ChatsContainer, classes.DisplayContainer].join(' ')}
                    id='chats-container'>ChatsContainer</div>
                <div 
                    className={[classes.UsersContainer, classes.HideContainer].join(' ')}
                id='users-container'>{users}</div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.userDetails
    }
}

export default connect(mapStateToProps)(Chats);