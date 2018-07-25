/*
New Page for each comment and user for each post
*/

import React,{ Component } from 'react';
/* Data coming from props so no use of tarcker component
import {withTracker} from 'meteor/react-meteor-data';*/
/*
This two files is no loner used because of we can get all data in one go 

import {Users} from '/db';

*/

import CommentUser from './CommentUser.jsx';
export default class SingleComment extends Component{
	render() {	
		return (
			<div>

			{(this.props.data)?(this.props.data).map((res)=>{
				return (
					<div key={res._id}>
					<hr />
						<p>Comment Text: {res.comment}</p>
						{
							 <CommentUser userDetail={res.commentAuthor} commentId={res._id}/>
						}
					
					</div>
				)
			}):""}
			</div>
		);
	}

}
