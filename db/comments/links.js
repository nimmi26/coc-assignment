import {Comments} from '/db';
import {Posts} from '/db';
/*Add links for post collections*/
Comments.addLinks({
  'posts': {
    type: 'one',
    collection: Posts,
    field: 'postId',
  }
}),
/*Add links for author of comments*/
Comments.addLinks({
  'commentAuthor': {
    type: 'one',
    collection: Meteor.users,
    field: 'userId',
  }
})
