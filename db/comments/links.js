import {Comments} from '/db';
import {Posts} from '/db';

Comments.addLinks({
  'posts': {
    collection: Posts,
    inversedBy: 'comments'
  }
})
