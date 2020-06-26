
import React from 'react';
import {Button} from 'semantic-ui-react';

import classes from './User.module.css';

const user = (props) => {
    return (
        <div className={classes.RootContainer}>
            <div>
                <img src={props.user.imageUrl}/> 
                <p>{props.user.username}</p>
            </div>
            <Button onClick={props.sendMessage}>Message</Button>
        </div>
    )
};

export default user;