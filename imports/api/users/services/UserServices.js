import { Promise } from 'meteor/promise';
class UserServices {
	static async createUser(userData){
		//Meteor.call('comment.create', comments, postId);
		let userPromise = new Promise((resolve, reject) => {
            Meteor.call('user.register',userData,(err,user)=>{
            	if(!err){
            		resolve(user)	
            	}else{
            		reject(err)
            	}
                
            }) 
        });
        let resultPostArry = await userPromise;
        return (resultPostArry);
	}

	static async loginUser(userEmail,userPassword){
		let loginStatus = new Promise((resolve, reject) => {
            Meteor.loginWithPassword(userEmail,userPassword,(err,user)=>{
            	if(!err){
            		resolve(user)	
            	}else{
            		reject(err)
            	}
                
            }) 
        });
        let resultPostArry = await loginStatus;
        return (resultPostArry);
	}
}
export default UserServices;
