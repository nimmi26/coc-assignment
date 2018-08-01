import React from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';
import UserServices from '../../../api/users/services/UserServices.js';

export default class Login extends React.Component {
    constructor() {
        super();
    }

    handleLogin = (data) => {
        const {email, password} = data;
        let loginUser = new Promise((resolve,reject) => {
            let loginResult = UserServices.loginUser(email,password);
            resolve(loginResult);
        })
        loginUser.then((loginResult)=>{
            this.props.history.push('/posts');
        })
        /*Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                return this.props.history.push('/posts');
            }
            alert(err.reason);
        });*/
    };

    render() {
        return (
            <div className="authentication">
                <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                    <ErrorsField/>

                    <AutoField name="email" placeholder="Email"/>

                    <AutoField name="password" type="password" placeholder="Password"/>

                    <button type="submit">Login</button>
                </AutoForm>
            </div>
        )
    }
}

const LoginSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {type: String}
});
