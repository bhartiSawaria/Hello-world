
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MyPosts.module.css';
import Post from '../../Feed/Post/Post';
import Spinner from '../../Spinner/Spinner';

class MyPosts extends Component{

    state = {
        posts: [],
        isLoading: true
    }

    sortByDateAsc = (a, b) => { 
        if(a.createdAt < b.createdAt){
            return 1;
        }
        return -1;
    }

    componentDidMount(){
        fetch('http://localhost:8080/user/posts',{
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
            const posts = result.posts;
            posts.sort(this.sortByDateAsc);
            this.setState({posts: posts, isLoading: false});
            console.log('state 1', this.state);
        })
        .catch(err => {
            console.log('Error in MyPosts', err);
            this.setState({isLoading: false});
        })
    }

    render(){
        let myPosts = this.state.posts.map(post => {
            return <Post key={post._id} post={post} token={this.props.token}/>
        });

        if(this.state.isLoading){
            myPosts = <Spinner />
        }
        
        return(
            <div className={classes.RootContainer}>
                {myPosts}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(MyPosts);