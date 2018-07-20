import React from 'react';
export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

     //Call meteod for delete post
    deletepost(postid){
        /*Fisrt delte comment related to post if there any*/
        let result = confirm("Want to delete?");
        if(result){
            Meteor.call('comments.delete',postid,(err,res)=>{
            /*Delete post after all comment deleted*/
                Meteor.call('post.remove',postid,(err,res)=>{
                  if(res){
                    alert('Post Delete');
                    return this.props.history.push('/posts');
                  }
                });
            });
        }
        
    }
    componentDidMount() {
       Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps != this.props) {
            Meteor.call('post.list', (err, posts) => {
                this.setState({posts});
            });
        }
    }

    render() {

        const {posts} = this.state;
        const {history} = this.props;
        let button = "";
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
                                {(Meteor.userId()===post.userId)?<button onClick={() => this.deletepost(post._id)}>Delete</button>:""}
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
