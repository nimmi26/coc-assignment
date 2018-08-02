import { Promise } from 'meteor/promise';
import {Meteor} from 'meteor/meteor';
class CommentServices {
    static addCommentToPost(comments,postId){
        Meteor.call('comment.create', comments, postId);
    }

    static deleteComment(commentId){
        Meteor.call('comment.delete',commentId);
    }
    static async totalCommentCount(postId){
        let commentCount = new Promise((resolve, reject) => {
            Meteor.call('commentCount',postId,(err,totalcomment)=>{
                resolve(totalcomment)
                setTimeout(reject, 3000);
            })
        });
        return (await commentCount);
    }
}
export default CommentServices;
