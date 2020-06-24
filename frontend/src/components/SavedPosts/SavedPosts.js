
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './SavedPosts.module.css';
import SavedPost from './SavedPost/SavedPost';
import Spinner from '../Spinner/Spinner';

class SavedPosts extends Component{

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
        fetch('http://localhost:8080/saved-posts',{
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
            console.log('Error in saved-posts', err);
            this.setState({isLoading: false});
        })
    }

    render(){
        let posts = this.state.posts.map(post => {
            return <SavedPost key={post._id} post={post} token={this.props.token}/>
        });

        if(this.state.isLoading){
            posts = <Spinner />
        }
        return(
            <div className={classes.RootContainer}>
                {posts}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(SavedPosts);