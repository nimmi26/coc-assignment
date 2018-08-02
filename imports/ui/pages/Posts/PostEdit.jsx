import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import PostServices from '/imports/api/posts/services/PostServices';
export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
        this.backToPost = this.backToPost.bind(this);
    }

    backToPost(){
        return this.props.history.push('/posts');
    }
    componentDidMount() {
        //Get post using services
       
        let promise = new Promise((resolve, reject) => {
            let post =  PostServices.getPostById(this.props.match.params._id)
            resolve(post)
            reject();
        });
        promise.then((post)=>{
            this.setState({post});
        })
    }

    submit = (post) => {
        let promise = new Promise((resolve, reject) => {
            let result =  PostServices.updatePostById(this.props.match.params._id,post)
            resolve(result);
            reject();
        });
        promise.then((result)=>{
            if(result){
                alert('Post modified!')
            }
            
        })
    };

    render() {
        const {post} = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>

                    {/*Added new field for category of post*/}

                    <SelectField name="category"/>
                    <button type='submit'>Edit post</button>
                    <button onClick={this.backToPost}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
