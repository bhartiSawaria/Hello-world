
import React, { Component } from 'react';

import classes from './MessagePanel.module.css';
import firebase from '../../../firebase';
import Spinner from '../../Spinner2/Spinner2';
import Message from './Message/Message';

class MessagePanel extends Component{

    state = {
        messagesRef: firebase.firestore().collection('messages'),
        path: this.props.path,
        allMessages: [],
        isLoading: true
    }

    sortByTime = (a, b) => {
        if(a.data.timestamp > b.data.timestamp){
            return 1;
        }
        return -1;
    }

    componentDidMount(){
        const { messagesRef, path } = this.state;
        const [ path1, path2 ] = path.split('-');
        messagesRef.doc(path1).collection(path2).onSnapshot(snap => {
            const loadedMessages = [];
            snap.forEach(s => {
                let isOwn = s.data().from == this.props.sender.id ? true: false;
                loadedMessages.push({data:s.data(), isOwn: isOwn});
            })
            loadedMessages.sort(this.sortByTime);
            this.setState({allMessages: loadedMessages, isLoading: false});
        })
    }

    render(){
        let messages;
        if(this.state.isLoading){
            messages = <Spinner />
        }
        else{
            messages = this.state.allMessages.map(msg => {
                return (
                    <Message key={msg.data.timestamp} message={msg.data} isOwn={msg.isOwn}/>
                )
            });
        }
        return(
            <div className={classes.RootContainer}>
                {messages}
            </div>
        )
    }
};

export default MessagePanel;