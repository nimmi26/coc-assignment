/* Post view page with post details*/

import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';
import {Comments} from '/db';
import {AutoForm, AutoField, HiddenField } from 'uniforms-unstyled';


class PostView extends React.Component {
	constructor(props) {
    super();
    //This meteor call increment the post view by one
    Meteor.call('post.viewincrement',props.match.params._id);
    
  }

	render() {
    
		const {posts, history} = this.props;
   
    
		if (!posts) {
      return <div>Loading....</div>
    }
		return (
      <div >
        <div>
        	<p>Post id: {posts._id} </p>
        </div>
        <div>
          <p> Post Description: {posts.description} </p>
        </div>
        <div>
        	<p>Post title: {posts.title}</p>
        </div>
        <div>
        	<p>Post Category: {posts.category}</p>
        </div>
        <div>
          <p>Total Views: {posts.views}</p>
        </div>
        
          <button onClick={() => {
              history.push("/posts/")
          }}> Back to post
          </button>
      </div>
  	)
	}
}
export default withTracker(props => {
    const handle = Meteor.subscribe('posts');
    
    return {
        loading: !handle.ready(),
        posts: Posts.findOne({_id:props.match.params._id}),
        
        ...props
    };
})(PostView);
