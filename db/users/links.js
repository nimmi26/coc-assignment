import {Posts} from '/db';

Meteor.users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'author'
    }
})
