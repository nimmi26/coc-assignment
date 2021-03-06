/* Post view page with post details*/


import React from 'react';
import {Meteor} from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import {withTracker} from 'meteor/react-meteor-data';
import {AutoForm, AutoField } from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import SingleComment from './SingleComment.jsx';
import { ReactiveVar } from 'meteor/reactive-var';
import PostServices from '/imports/api/posts/services/PostServices';
import CommentServices from '/imports/api/comment/services/CommentServices';

class PostView extends React.Component {

    constructor(props) {
        super();
        //This meteor call increment the post view by one
        PostServices.incrementViewsOfPost(props.match.params._id);

        this.commentSubmit = this.commentSubmit.bind(this);
        this.backToPost = this.backToPost.bind(this);
        this.DeletePost = this.DeletePost.bind(this);
       
    }

    backToPost(){
        return this.props.history.push('/posts');
    }
    DeletePost(){
        if(window.confirm("Want to delete?")){
            let promise = new Promise((resolve, reject) => {
                let res =  PostServices.deletePost(this.props.grapherPost._id);
                resolve(res);
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

    //Handel comment submit for post
    commentSubmit = (comment) => {
        /*If user not logged in the redirect to login page*/
        if(!Meteor.userId()){
            return this.props.history.push('/login');
        }
        CommentServices.addCommentToPost(comment,this.props.grapherPost._id);
        /*Meteor.call('comment.create', post, this.props.grapherPost._id,(err) => {
            if (err) {
                return alert(err)
            }
        }); */
    };

    render() {

        const {grapherPost} = this.props;
        let button = "";
        if (!grapherPost) {
            return <div>Loading....</div>
        }

        /*Check if loggedin user is owner of post */
        if(Meteor.userId() === grapherPost.userId){
            button = <button onClick={this.DeletePost}>Delete</button>
        }
        return (
            <div >
                <div>
                    <p>Post id: {grapherPost._id} </p>
                </div>
                <div>
                    <p> Post Description: {grapherPost.description} </p>
                </div>
                <div>
                    <p>Post title: {grapherPost.title}</p>
                </div>
                <div>
                    <p>Post Category: {grapherPost.category}</p>
                </div>
                <div>
                    <p>Total Views: {grapherPost.views}</p>
                </div>
                <div>
                    <p>Post Author: {(grapherPost.author)?grapherPost.author.emails[0].address:""}</p>
                </div>
                <div>

                    {/*Added show comment section for each post */}
                    <div>
                        <p>Total Comments: {((grapherPost.comments))?_.size(grapherPost.comments):0}</p>
                    </div>
                    {/*Added comment functionality for post */}

                    <div  className="comment">
                        <AutoForm onSubmit={this.commentSubmit} schema={CommentSchema}>
                            <AutoField name="comment"/>
                            <button type='submit' >Add Comment</button>
                        </AutoForm>
                    </div>
                    <br />

                    {/*End of comment form */}
                </div>
                { grapherPost.comments?  <SingleComment data={grapherPost.comments}/>:<div>No Comments</div>  }

                {/*Add post delete button*/}
                {button}
                <button onClick={this.backToPost}>Back to posts</button>
            </div>
        )
    }
}
/*Define reactive variable to store grapher query result*/
const postGrapher = new ReactiveVar([]);
export default withTracker(props => {
    let promise = new Promise((resolve, reject) => {
        let posts =  PostServices.getPostById(props.match.params._id)
        resolve(posts)
        reject();
    });
    promise.then((posts)=>{
        postGrapher.set(posts)
    })
    return {
        grapherPost: postGrapher.get(),
        ...props
    };
})(PostView);

