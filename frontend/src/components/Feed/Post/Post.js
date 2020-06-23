
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

import classes from './Post.module.css';

class Post extends Component{

    state = {
        id: this.props.post._id,
        type: this.props.post.imageUrl ? 2 : 1
    }

    likeIconClickHandler = (event) => {
        const id = this.state.id + '-like-icon';
        const icon = document.getElementById(id);
        let isOutlined = icon.classList.contains('outline');
        if(isOutlined){
            icon.classList.remove('outline');
            icon.style.color = 'red';
        }
        else{
            icon.classList.add('outline');
            icon.style.color = '';
        }
    }

    saveIconClickHandler = () => {
        const id = this.state.id + '-save-icon';
        const icon = document.getElementById(id);
        let isOutlined = icon.classList.contains('outline');
        if(isOutlined){
            icon.classList.remove('outline');
            fetch('http://localhost:8080/save-post/type' + this.state.type, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token
                },
                body: JSON.stringify({
                    postId: this.state.id
                })
            })
            .then(result => {
                console.log('Result 1', result);
                return result.json();
            })
            .then(result => {
                console.log('Result 2', result);
            })
            .catch(err => {
                console.log('Error in saving a post', err);
            })
        }
        else{
            icon.classList.add('outline');
            fetch('http://localhost:8080/remove-saved-post/type' + this.state.type, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token
                },
                body: JSON.stringify({
                    postId: this.state.id
                })
            })
            .then(result => {
                console.log('Result 1', result);
                return result.json();
            })
            .then(result => {
                console.log('Result 2', result);
            })
            .catch(err => {
                console.log('Error in removing a saved post', err);
            })
        }
    }

    render(){
        let username = this.props.post.postedBy && this.props.post.postedBy.username;
        return (
            <div className={classes.RootContainer}>
                <div className={classes.UsernameContainer}>
                    <p>{username}</p>
                    <span>{moment(this.props.post.createdAt).fromNow()}</span>
                </div>
                <hr/>
                { this.props.post.title ? (
                    <div className={classes.Title}>
                        <p>{this.props.post.title}</p>
                    </div>
                ) : null}
                { this.props.post.content ? (
                    <div className={classes.Content}>
                        <p>{this.props.post.content}</p>
                        <hr/>
                    </div>
                ) : null}
                { this.props.post.imageUrl ? (
                    <div className={classes.ImageContainer}>
                        <img src={this.props.post.imageUrl} alt={this.props.post.username} />
                    </div>
                ) : null}
                { this.props.post.caption ? (
                    <div className={classes.Caption}>
                        <h2>{this.props.post.caption}</h2>
                        <hr/>
                    </div>
                ) : null}
                <div className={classes.IconsContainer}>
                    <Icon 
                        name='heart outline' 
                        size='large' 
                        id={this.state.id + '-like-icon'}  
                        onClick={this.likeIconClickHandler}/>
                    <Icon 
                        name='bookmark outline' 
                        size='large' 
                        id={this.state.id + '-save-icon'} 
                        style={{position: 'absolute', right: '0px'}} 
                        onClick={this.saveIconClickHandler}/>
                </div>
                {/* <i className="far fa-heart"></i> */}
            </div>
        )
    }
}

export default Post;