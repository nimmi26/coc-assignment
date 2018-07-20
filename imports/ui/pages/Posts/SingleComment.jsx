/*
New Page for each comment and user for each post
*/

import React,{ Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import CommentUser from './CommentUser.jsx';
import {Users} from '/db';
class SingleComment extends Component{
	render() {
		const {user, history} = this.props;
		
		if(!user){
			return <div>Loding</div>
		}
		
		return (
			<div>
				<p>Comment Text: {this.props.comment.comment}</p>
				{ user.length>0 ?
          user.map((res) =>{
            return <CommentUser key={res._id} userDetail={res} commentId={this.props.comment._id} postId={this.props.postId} postOwner={this.props.postOwner} />
          }) : <div>No comments</div>
        }
        <hr/>
			</div>
		);
	}
}
export default withTracker(props => {
	let userId = props.comment.userId;
	const handle = Meteor.subscribe('userProfile',userId);
  return {
    loading: !handle.ready(),
    user: Meteor.users.find({_id:userId}).fetch(),
    ...props
  };
})(SingleComment);
