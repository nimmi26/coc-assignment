import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Comments} from '/db';
class TotalComments extends Component{
	render() {
		const { comments,history} = this.props;
		if(!comments){
			return <div>hi</div>
		}

		return (
			<div>
				<p>Total Viwes: {this.props.totalviews}</p>
				<p>Total Comments: {comments.length}</p>
			</div>
		);
	}
}
export default withTracker(props => {
	console.log(props)
    const handleComment = Meteor.subscribe('comments');
    return {
      comments: Comments.find({postId:props.postid}).fetch(),
      ...props
    };
})(TotalComments);
