import React,{ Component } from 'react';
import PostServices from '/imports/api/posts/services/PostServices'
export default class Testing extends Component{
	render() {
		let promise = new Promise((resolve, reject) => {
			let postArr =  PostServices.getPost()
			resolve(postArr)
		});
		promise.then((postArr)=>{
			console.log(postArr)
		})
		
		return (
			<div>Hi		}
			</div>
		);
	}
}
