import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        post.userId = Meteor.userId();
        return Posts.insert(post)
    },

    'post.list' () {
        return Posts.find({},{sort:{createdAt:-1}}).fetch();
    },

    //Rewrite post list query using grapher query

    'postListUsingGrapher' () {
        return Posts.createQuery({
            //$filters: {_id: postId},
            title: 1,
            createdAt: 1,
            views: 1,
            description: 1,
            category: 1,
            userId: 1,
        }).fetch();
    },

    'post.edit' (_id, post) {
        return (
            Posts.update(_id, {
                $set: {
                    title: post.title,
                    description: post.description,
                    category: post.category
                }
            })
        )
    },

    'post.remove' (_id){
        return Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },

    //Method for incrementing view by one.
    'post.viewincrement' (_id){
        Posts.update(_id, {
            $inc:{views: 1} 
        });
    },

    'getPost'(postId){
        let post = Posts.createQuery({
            $filters: {_id: postId},
            title: 1,
            createdAt: 1,
            views: 1,
            description: 1,
            category: 1,
            userId: 1,
            author: {
                'emails.address': 1
            },
            comments: {
                comment: 1,
                createdAt: 1,
                commentAuthor: {
                    'emails.address': 1
                },
            }
        });

        return post.fetchOne();
    }


});
