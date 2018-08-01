import React from 'react';
import TotalComments from './TotalComments.jsx';
import PostServices from '/imports/api/posts/services/PostServices';
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
            /* Remove comment delete functionality because start using autoremovel for deletion

             Meteor.call('comments.delete',postid,(err,res)=>{})
            /*Delete post after all comment deleted

            */

           /* Meteor.call('post.remove',postid,(err,res)=>{
              if(res){
                alert('Post Delete');
                return this.props.history.push('/posts');
              }
            });*/

            //Deleting post using service 
            let promise = new Promise((resolve, reject) => {
                let res =  PostServices.deletePost(postid)
                resolve(res)
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
       /*
        Changing this code with grapher query


        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        }); */  

        /*Meteor.call('postListUsingGrapher', (err, posts) => {
            this.setState({posts});
        }); */  


        //Now getting post using services  
        let promise = new Promise((resolve, reject) => {
            let posts =  PostServices.getPost()
            resolve(posts)
        });
        promise.then((posts)=>{
            this.setState({posts});
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps != this.props) {
           /*
            Changing this code with grapher query


            Meteor.call('post.list', (err, posts) => {
                this.setState({posts});
            });*/


            /*Meteor.call('postListUsingGrapher', (err, posts) => {
                this.setState({posts});
            });*/

            //Now getting post using services  
            let promise = new Promise((resolve, reject) => {
                let posts =  PostServices.getPost()
                resolve(posts)
            });
            promise.then((posts)=>{
                this.setState({posts});
            }) 
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
                                <TotalComments key={post._id} postid={post._id} totalviews={post.views} />
                                
                                {(Meteor.userId()===post.userId)?<div><button onClick={() =>{history.push("/posts/edit/" + post._id)}}>Edit</button><button onClick={() => this.deletepost(post._id)}>Delete</button></div>:""}
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
