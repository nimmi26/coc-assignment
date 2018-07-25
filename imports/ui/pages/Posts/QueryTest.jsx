import React, {Component} from 'react';
import {Posts} from '/db';
export default class QueryTest extends Component{

	render() {
		Meteor.call('getPost',(err,res)=>{
			console.log(res)
		})
		//console.log(query);
		return (
			<div>Hi</div>
		);
	}
}
