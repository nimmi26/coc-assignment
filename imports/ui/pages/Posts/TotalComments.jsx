import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Comments} from '/db';
class TotalComments extends Component{
	render() {
		const { comments,history} = this.props;
		if(!comments){
			return <p>Total Viwes: {this.props.totalviews}</p>
		}
		
		return (
			<div>
				<p>Total Viwes: {this.props.totalviews}</p>
				<p>Total Comments: {comments}</p>
			</div>
		);
	}
}
export default withTracker(props => {
  const handleComment = Meteor.subscribe('comments');
  return {
    comments: Comments.find({postId:props.postid}).count(),
    ...props
  };
})(TotalComments);
