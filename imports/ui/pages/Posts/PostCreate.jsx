import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.handelSubmit = this.handelSubmit.bind(this)
    }

    handelSubmit = (post) => {
        if(!Meteor.userId()){
            return this.props.history.push('/login');
        }else{
            Meteor.call('post.create', post, (err) => {
                if (err) {
                    return console.log(err)
                }
                alert('Post added!')
            });
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
