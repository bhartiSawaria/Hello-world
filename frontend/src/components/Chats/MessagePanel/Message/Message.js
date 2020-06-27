
import React from 'react';
import moment from 'moment';

import classes from './Message.module.css';

const getFormattedTime = (timestamp) => {
    const date = new Date(timestamp.toDate());
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let s = 'AM';
    if(hours > 12){
        hours = hours - 12;
        s = 'PM'
    }
    else if(hours < 10){
        hours = '0' + hours;
    }
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    return hours + ':' + minutes + ' ' + s;
}

const message = (props) => {
    let time = getFormattedTime(props.message.timestamp);
    let messageClass = props.isOwn ? classes.RootContainerRight : classes.RootContainerLeft;
    return(
        <div className={messageClass}>
            <p>{props.message.content}<br/> <span>{time}</span></p>
        </div>     
    )
};

export default message;