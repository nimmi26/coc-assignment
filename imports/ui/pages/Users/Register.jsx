import React, {Component} from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';
import UserServices from '../../../api/users/services/UserServices.js';
export default class Register extends Component {
    constructor() {
        super();
    }

    onSubmit = (data) => {
        let userCreatePromise = new Promise((resolve, reject) => {
            let userResult   = UserServices.createUser(data);
            resolve(userResult);
            reject();
        });
        userCreatePromise.then((userResult)=>{
            if(userResult){
                let loginUser = new Promise((resolve,reject) => {
                    let loginResult = UserServices.loginUser(data.email,data.password);
                    resolve(loginResult);
                    reject();
                })
                loginUser.then(()=>{
                    this.props.history.push('/posts');
                })
            }
           
        })
    };


    render() {
        return (
            <div className="authentication">
                <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit}>
                    <ErrorsField/>
                    <AutoField name="email" placeholder="Email"/>
                    <AutoField name="password" type="password" placeholder="Password *"/>
                    <AutoField name="confirm_password" type="password" placeholder="Confirm password"/>
                    <button type="submit">Create account</button>
                </AutoForm>
            </div>
        )
    }
}

const RegisterSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
    },
    confirm_password: {
        type: String,
        custom() {
            if (this.value !== this.field('password').value) {
                return 'passwordMismatch';
            }
        }
    },
});
