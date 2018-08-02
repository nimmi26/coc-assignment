import React from 'react';
import TotalComments from './TotalComments.jsx';
import PostServices from '/imports/api/posts/services/PostServices';
import {Meteor} from 'meteor/meteor';
export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
        this.createPost = this.createPost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    editPost(event){
        let postId = event.target.value;
        return this.props.history.push("/posts/edit/" + postId);
    }
 
    createPost(){
        return this.props.history.push('/posts/create');
    }

    deletePost(event){
        let postId = event.target.value;
        let result = confirm("Want to delete?");
        if(result){
            //Deleting post using service
          
            let promise = new Promise((resolve, reject) => {
                let res =  PostServices.deletePost(postId)
                resolve(res)
                reject();
            });
            promise.then((res)=>{
                if(res){
                    alert('Post Deleted');
                    return this.props.history.push('/posts');
                }
            });
        }
    }

    componentDidMount() {
        //Now getting post using services
        let promise = new Promise((resolve, reject) => {
            let posts =  PostServices.getPost()
            resolve(posts)
            setTimeout(reject, 3000)
        });
        promise.then((posts)=>{
            this.setState({posts});
        });

    }

    componentDidUpdate(prevProps) {
        if(prevProps != this.props) {
            //Now getting post using services
            let promise = new Promise((resolve, reject) => {
                let posts =  PostServices.getPost()
                resolve(posts)
                setTimeout(reject, 3000);
            });
            promise.then((posts)=>{
                this.setState({posts});
            })
        }
    }

    render() {

        const {posts} = this.state;
        
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
                                <TotalComments key={post._id} postid={post._id} totalviews={post.views} />
                                
                                {(Meteor.userId()===post.userId)?
                                    <div>
                                        <button onClick={this.editPost} value={post._id}>Edit</button>
                                        <button onClick={this.deletePost} value={post._id} >Delete</button>
                                    </div>:""
                                }
                            </div>
                        )
                    })}
                <button onClick={this.createPost} >Create a new post</button>
            </div>
        )
    }
}
