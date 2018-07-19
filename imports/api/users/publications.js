import {Users} from '/db';
import {Meteor} from "meteor/meteor";

Meteor.publish('userProfile', function(userId) {
    return Users.find({_id:userId});
});
