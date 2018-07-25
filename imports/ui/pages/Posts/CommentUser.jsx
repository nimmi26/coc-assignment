/*New component which contail user information who commented on post
and delete comment if user is owner of comment or owner of post.

Deleting this file beacuse no need of this file 

*/

import React,{ Component } from 'react';
export default class CommentUser extends Component{
	constructor(props) {
    super();   
    this.deleteComment = this.deleteComment.bind(this)
  }
  deleteComment(){
  	/*Delete comment*/
  	let result = confirm("Want to delete?");
    if(result){
			Meteor.call('comment.delete',this.props.commentId,(err,res)=>{})
		}
  }
	render() {
	
		let button = "";
	
		if(this.props.userDetail._id === Meteor.userId() || Meteor.userId() === this.props.postOwner ){
			button = <button onClick={this.deleteComment.bind(this)}>Delete Comment</button>
		}
		return (
			<div>
				<p>Comment By: {this.props.userDetail.emails[0].address}</p>
				{button}
			</div>
		);
	}
}
