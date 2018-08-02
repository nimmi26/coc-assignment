import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import PostServices from '/imports/api/posts/services/PostServices';
import { ReactiveVar } from 'meteor/reactive-var';
class PostListReactive extends React.Component {
    constructor() {
        super();
        this.createPost = this.createPost.bind(this);
        this.backToPost = this.backToPost.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    editPost(event){
        let postId = event.target.value;
        return this.props.history.push("/posts/edit/" + postId);
    }

    backToPost(){
        return this.props.history.push('/posts');
    }

    createPost(){
        return this.props.history.push('/posts/create');
    }
    render() {
        const {posts} = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>Post title: {post.title}, Post Description: {post.description} </p>
                                <button onClick={this.editPost} value={post._id}>Edit</button>
                            </div>
                        )
                    })}
                <button onClick={this.createPost} >Create a new post</button>
            </div>
        )
    }
}

const postGrapher = new ReactiveVar([]);
export default withTracker(props => {
    Promise.reject();
    let promise = new Promise((resolve, reject) => {
        let posts =  PostServices.getPost()
        resolve(posts);
        reject();
    });
    promise.then((posts)=>{
        postGrapher.set(posts)
    })
    return {
        posts: postGrapher.get(),
        ...props
    };
})(PostListReactive);
