
import React, { Component } from 'react';

import classes from './PrivateChat.module.css';
import MessagePanel from '../MessagePanel/MessagePanel';
import { Button, Input } from 'semantic-ui-react';

import UserImage from '../../../assets/images/user2.png';

class PrivateChat extends Component{
    state = {
        message: ''
    }

    inputChangeHandler = (event) => {
        this.setState({message: event.target.value})
    }

    render(){
        return(
            <div className={classes.RootContainer}>
                <div className={classes.MainHeader}>
                    <img src={UserImage}/>
                    <div> 
                        <p>Bharti</p>
                        <span>bharti</span>
                    </div>
                </div>
                <MessagePanel />
                <div className={classes.SendOptionsContainer}>
                    <Input 
                        type='text'
                        name='message'
                        value={this.state.message}
                        placeholder='Type Message'
                        onChange={this.inputChangeHandler}
                        style={{width: '98%'}}/>
                    <button className={classes.MessageButton}>Send Message</button>
                    <button className={classes.MediaButton}>Send Media</button>
                </div>
            </div>
        )
    }
};

export default PrivateChat;