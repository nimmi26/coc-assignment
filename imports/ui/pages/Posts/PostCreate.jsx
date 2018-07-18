import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.handelSubmit = this.handelSubmit.bind(this)
    }

    handelSubmit = (post) => {
        if(post.category != "" && post.title != "" && post.description != ""){
            Meteor.call('post.create', post, (err) => {
                if (err) {
                    return console.log(err)
                }
                alert('Post added!')
            });
        }else{
            alert("Value can't be null");
        }
        
    };

    render() {
        const {history} = this.props;
        return (
            <div  className="post">
                <AutoForm onSubmit={this.handelSubmit.bind(this)} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="category"/>
                    <button type='submit' >Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
