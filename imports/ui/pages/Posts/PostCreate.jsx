import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import PostServices from '/imports/api/posts/services/PostServices';
export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.handelSubmit = this.handelSubmit.bind(this)
    }

    handelSubmit = (posts) => {
        if(!Meteor.userId()){
            return this.props.history.push('/login');
        }else{
            let postCreatePromise = new Promise((resolve, reject) => {
                let res = PostServices.createPost(posts);
                resolve(res)
            });
            postCreatePromise.then((res)=>{
                alert('Post Added');
                return this.props.history.push('/posts');
            })
        }
    };

    render() {
        const {history} = this.props;
        if(!Meteor.userId()){
            return this.props.history.push('/login');
        }
        return (
            <div  className="post">
                <AutoForm onSubmit={this.handelSubmit.bind(this)} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>

                {/* Added new element in form for category of post*/}
                
                    <SelectField name="category"/>
                    <button type='submit' >Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
