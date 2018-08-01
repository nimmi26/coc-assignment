import { Promise } from 'meteor/promise';
class CommentServices {
	static addCommentToPost(comments,postId){
		Meteor.call('comment.create', comments, postId);
	}

	static deleteComment(commentId){
		Meteor.call('comment.delete',commentId);
	}
}
export default CommentServices;
