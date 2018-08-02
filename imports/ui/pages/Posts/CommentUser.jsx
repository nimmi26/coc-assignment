/*New component which contail user information who commented on post
and delete comment if user is owner of comment or owner of post.

Deleting this file beacuse no need of this file

*/

import React,{ Component } from 'react';
import CommentServices from '/imports/api/comment/services/CommentServices';
import {Meteor} from 'meteor/meteor';
export default class CommentUser extends Component{
    constructor(){
        super();
        this.deleteComment = this.deleteComment.bind(this);
    }
    deleteComment(){
        /*Delete comment*/
        let result = confirm("Want to delete?");
        if(result){
            CommentServices.deleteComment(this.props.commentId);
        }
    }
      
    render(){
        let button = "";
        if(this.props.userDetail._id === Meteor.userId() || Meteor.userId() === this.props.postOwner ){
            button = <button onClick={this.deleteComment}>Delete Comment</button>
        }
        return(
            <div>
                <p>Comment By: {this.props.userDetail.emails[0].address}</p>
                {button}
            </div>
        );
    }
}
