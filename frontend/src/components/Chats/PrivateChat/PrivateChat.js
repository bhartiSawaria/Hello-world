
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';

import classes from './PrivateChat.module.css';
import MessagePanel from '../MessagePanel/MessagePanel';
import firebase from '../../../firebase';

class PrivateChat extends Component{
    state = {
        message: '',
        messagesRef: firebase.firestore().collection('messages'),
        path: this.props.match.params.path,
        allMessages: [],
        isLoading: false
    }

    inputChangeHandler = (event) => {
        this.setState({message: event.target.value})
    }

    sendTextMessageHandler = () => {
        this.setState({isLoading: true});
        const path = (this.props.match.params.path);
        const [ path1, path2 ] = path.split('-');
        const { messagesRef } = this.state;
        messagesRef.doc(path1).collection(path2).add({
            content: this.state.message,
            from: this.props.user.id,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(doc => {
            console.log('Msg Written successfully id = ', doc.id);
            this.setState({message: '', isLoading: false});
        })
        .catch(err => {
            console.log('Error occured ', err);
            this.setState({message: '', isLoading: false});
        })
    }

    render(){
        // console.log(this.props.history.location.state);
        const {receiver, sender} = this.props.history.location.state;
        return(
            <div className={classes.RootContainer}>
                <div className={classes.MainHeader}>
                    <img src={receiver.imageUrl} alt='profilePic'/>
                    <div> 
                        <p>{receiver.username}</p>
                        <span>{receiver.name}</span>
                    </div>
                </div>
                <MessagePanel messages={this.state.allMessages} path={this.state.path} sender={sender}/>
                <div className={classes.SendOptionsContainer}>
                    <Input 
                        type='text'
                        name='message'
                        value={this.state.message}
                        placeholder='Type Message'
                        onChange={this.inputChangeHandler}
                        style={{width: '98%'}}/>
                    <Button
                        color = 'green'
                        className={classes.MessageButton}
                        onClick={this.sendTextMessageHandler}
                        loading={this.state.isLoading}
                        disabled={this.state.message.length === 0 ? true : false}>Send Message</Button>
                    <button className={classes.MediaButton}>Send Media</button>
                </div>
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

export default connect(mapStateToProps)(PrivateChat);