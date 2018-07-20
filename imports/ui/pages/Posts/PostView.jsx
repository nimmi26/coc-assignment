/* Post view page with post details*/


import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';
import {Comments} from '/db';
import {AutoForm, AutoField, HiddenField } from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import SingleComment from './SingleComment.jsx';

class PostView extends React.Component {

  constructor(props) {
    super();
    //This meteor call increment the post view by one
    Meteor.call('post.viewincrement',props.match.params._id);
    this.commentSubmit = this.commentSubmit.bind(this)
    this.deletepost = this.deletepost.bind(this)
  }

  //Call meteod for delete post
  deletepost(){
    let result = confirm("Want to delete?");
    if(result){
      /*Fisrt delte comment related to post if there any*/
      Meteor.call('comments.delete',this.props.posts._id,(err,res)=>{
      /*Delete post after all comment deleted*/
          Meteor.call('post.remove',this.props.posts._id,(err,res)=>{
            if(res){
              alert('Post Delete');
              return this.props.history.push('/posts');
            }
          });
     
      });
    }
  }

  //Handel comment submit for post
  commentSubmit = (post) => {
    /*If user not logged in the redirect to login page*/
    if(!Meteor.userId()){
      return this.props.history.push('/login');
    }
    Meteor.call('comment.create', post, this.props.posts._id,(err) => {
      if (err) {
          return alert(err)
      }
      
    });    
  };

  render() {
    
    const {posts, comments,history} = this.props;
    let button = "";
    if (!posts ) {
      return <div>Loading....</div>
    }
  
    /*Check if loggedin user is owner of post */
    if(Meteor.userId() === posts.userId){
      button = <button onClick={this.deletepost.bind(this)}>Delete Post </button>
    }
    return (
      <div >
        <div>
          <p>Post id: {posts._id} </p>
        </div>
        <div>
          <p> Post Description: {posts.description} </p>
        </div>
        <div>
          <p>Post title: {posts.title}</p>
        </div>
        <div>
          <p>Post Category: {posts.category}</p>
        </div>
        <div>
          <p>Total Views: {posts.views}</p>
        </div>
        <div>

        {/*Added comment functionality for post */}

        <div  className="comment">
          <AutoForm onSubmit={this.commentSubmit.bind(this)} schema={CommentSchema}>
            <AutoField name="comment"/>
            <button type='submit' >Add Comment</button>
          </AutoForm>
        </div>
        <br />
      {/*End of comment form */}

      {/*Added show comment section for each post */}
        <p>Total Comments: {comments.length>0?comments.length:0}</p>
        { comments.length>0 ?
          comments.map((res) =>{
            /*new component for post comment and ccommented by*/
            return <SingleComment key={res._id} postOwner={posts.userId} postId={posts._id} comment={res}/>
          }) : <div>No comments</div>
        }
        </div>
      

      {/*Add post delete button*/}
        {button}
        <button onClick={() => {
            history.push("/posts/")
        }}> Back to post
        </button>
      </div>
    )
  }
}
export default withTracker(props => {
    const handle = Meteor.subscribe('posts');
    const handleComment = Meteor.subscribe('comments');
    return {
      loading: !handle.ready(),
      loadingComment: !handleComment.ready(),
      posts: Posts.findOne({_id:props.match.params._id}),
      comments: Comments.find({postId:props.match.params._id}).fetch(),
      ...props
    };
})(PostView);
