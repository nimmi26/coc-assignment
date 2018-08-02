import React from 'react';
import {Meteor} from 'meteor/meteor';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import PostServices from '/imports/api/posts/services/PostServices';
export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.handelSubmit = this.handelSubmit.bind(this);
        this.backToPost = this.backToPost.bind(this);
    }

    backToPost(){
        return this.props.history.push('/posts');
    }
    handelSubmit = (posts) => {
        if(!Meteor.userId()){
            return this.props.history.push('/login');
        }else{
            Promise.reject();
            let postCreatePromise = new Promise((resolve, reject) => {
                let res = PostServices.createPost(posts);
                resolve(res);
                reject();
            });
            postCreatePromise.then((res)=>{
                if(res){
                    alert('Post Added');
                    return this.props.history.push('/posts');
                }
                
            })
        }
    };

    render() {
        if(!Meteor.userId()){
            return this.props.history.push('/login');
        }
        return (
            <div  className="post">
                <AutoForm onSubmit={this.handelSubmit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>

                    {/* Added new element in form for category of post*/}
                
                    <SelectField name="category"/>
                    <button type='submit' >Add post</button>
                    <button onClick={this.backToPost} >Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
