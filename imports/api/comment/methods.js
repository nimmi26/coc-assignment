import {Meteor} from 'meteor/meteor'
import  { Comments }  from '/db';
import { Posts } from '/db';

Meteor.methods({
    /*Methods for create method for post comment */
    'comment.create'(data,postid){
        Comments.insert(
            {
                comment:data.comment,
                userId:this.userId,
                postId:postid
            }
        );
    },
	
    /*Method for delete comment by comment id*/
    'comment.delete'(commentId){
        return Comments.remove({_id:commentId});
    },
	
    /*Method for delete comment when post deleted*/
    'comments.delete'(postid){
        return Comments.remove({postId:postid})
    },

    'comment.fetch'(){
        let query = Posts.createQuery({
            posts: {
                title: 1,
            }
        }).fetch();
        return query;
    },

    'commentCount'(postId){
        return Comments.find({postId:postId}).count();
    }
});
