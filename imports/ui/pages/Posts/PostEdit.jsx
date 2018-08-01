import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import PostServices from '/imports/api/posts/services/PostServices';
export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        /*Replacing this simple post get query with grapher query 
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });*/
       /* Meteor.call('getPost', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });*/

        //Get post using services
        let promise = new Promise((resolve, reject) => {
            //console.log(this.props.match.params._id)
            let post =  PostServices.getPostById(this.props.match.params._id)
            resolve(post)
        });
        promise.then((post)=>{
            this.setState({post});
        }) 
    }

    submit = (post) => {
        let promise = new Promise((resolve, reject) => {
            //console.log(this.props.match.params._id)
            let result =  PostServices.updatePostById(this.props.match.params._id,post)
            resolve(result)
        });
        promise.then((result)=>{
            alert('Post modified!')
        }) 
        /*Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });*/
    };

    render() {
        const {history} = this.props;
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
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
