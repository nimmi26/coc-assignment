import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';
import PostServices from '/imports/api/posts/services/PostServices';
class PostListReactive extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {posts, history} = this.props;

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
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}

const postGrapher = new ReactiveVar([]);
export default withTracker(props => {
    let promise = new Promise((resolve, reject) => {
    let posts =  PostServices.getPost()
        resolve(posts)
    });
    promise.then((posts)=>{
        postGrapher.set(posts)
    }) 
    return {
        posts: postGrapher.get(),
        ...props
    };
})(PostListReactive);
