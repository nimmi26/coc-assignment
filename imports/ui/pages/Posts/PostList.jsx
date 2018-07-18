import React from 'react';
export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

    componentDidMount() {
       Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });        
    }

    render() {

        const {posts} = this.state;
        const {history} = this.props;
        
        if (!posts) {
            return <div>Loading2....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <a href={"/posts/view-post/" + post._id } >
                                    <p>Post title: {post.title}, Post Description: {post.description} </p>
                                </a>
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
