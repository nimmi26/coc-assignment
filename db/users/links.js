import {Posts} from '/db';
import {Comments} from '/db';

/* Inversed link of post collection 
A post has an author which belongs to a userid*/
Meteor.users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'author',
        autoremove: true,
    }
})


/* Inversed link of comment collection 
A comment has an author which belongs to a userid*/
Meteor.users.addLinks({
	'comments': {
		collection: Comments,
		inversedBy: 'commentAuthor',
		autoremove: true,
	}
})
