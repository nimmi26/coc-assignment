import {Posts} from '/db';
import {Comments} from '/db';

/*Creating links for post to user each post has an author*/
Posts.addLinks({
  'author': {
    type: 'one',
    collection: Meteor.users,
    field: 'userId',
  }
})

/*Inverse link to comments collection post  
comments must have a post */
Posts.addLinks({
	'comments': {
    collection: Comments,
    inversedBy: 'posts',
    autoremove: true,
  }
})
