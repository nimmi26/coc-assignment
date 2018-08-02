import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import CommentServices from '/imports/api/comment/services/CommentServices';
class TotalComments extends Component{
    render() {
        const { comments} = this.props;
        if(!comments){
            return <p>Total Viwes: {this.props.totalviews}</p>
        }
        return (
            <div>
                <p>Total Viwes: {this.props.totalviews}</p>
                <p>Total Comments: {comments}</p>
            </div>
        );
    }
}
let commentscount = "";
export default withTracker(props => {
    let commentCountPromise = new Promise((resolve, reject) => {
        let totalNoComment =  CommentServices.totalCommentCount(props.postid)
        resolve(totalNoComment)
        setTimeout(reject, 6000)
    });
    commentCountPromise.then((totalNoComment)=>{
        commentscount = totalNoComment;
    })
    return {
        comments: commentscount,
        ...props
    };
})(TotalComments);
