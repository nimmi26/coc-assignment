import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        Posts.insert({
            title:post.title,
            description:post.description,
            category:post.category,
            userId:Meteor.userId()
        })
    },

    'post.list' () {
        return Posts.find({},{sort:{createdAt:-1}}).fetch();
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                category: post.category
            }
        });
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
    }
});
