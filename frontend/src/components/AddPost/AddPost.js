
import React, { Component } from 'react';

import classes from './AddPost.module.css';

class AddPost extends Component{

    clickPostTypeHandler = (type) => {
        this.props.history.push('/add-post/type' + type);
    }

    render(){
        return(
            <div className={classes.Rootcontainer}>
                <div className={classes.PostType} onClick={() => this.clickPostTypeHandler(1)}>
                    <div>
                        Share your thoughts
                    </div>
                </div>
                <div className={classes.PostType} onClick={() => this.clickPostTypeHandler(2)}>
                    <div>
                        Share images with captions
                    </div>
                </div>
            </div>
        )
    }
};

export default AddPost; 