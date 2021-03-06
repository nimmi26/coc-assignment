import { Promise } from 'meteor/promise';
import { Meteor } from 'meteor/meteor';
class PostServices {
    static async createPost(posts){
        Promise.reject();
        let postCreatePromise = new Promise((resolve, reject) => {
            Meteor.call('post.create',posts,(err,res)=>{
                resolve(res)
                reject();
            })
        });
        let result = await postCreatePromise;
        return (result);
    }
    //Service for getting all the post
    static async getPost() {
        
        let postPromise = new Promise((resolve, reject) => {
            Meteor.call('postListUsingGrapher',(err,posts)=>{
                resolve(posts)
                reject();
            })
        });
        let resultPostArry = await postPromise;
        return (resultPostArry);
    }

    //Service for deleting post by owner
    static async deletePost(postid){
        let deletePromise = new Promise((resolve, reject) =>{
            Meteor.call('post.remove',postid,(err,res)=>{
                if(res){
                    resolve(res)
                }else{
                    reject();
                }
            })
        });
        let resltOfDelete = await deletePromise;
        return (resltOfDelete);
    }

    //Service for increment views on the post
    static incrementViewsOfPost(postid){
        Meteor.call('post.viewincrement',postid);
    }

    //get all info about post using its id
    //Service for getting all the post
    static async getPostById(postId) {
        let postPromise = new Promise((resolve, reject) => {
            Meteor.call('getPost',postId,(err,posts)=>{
                resolve(posts)
                reject();
            })
        });
        let resultPostArry = await postPromise;
        return (resultPostArry);
    }

    static async updatePostById(postId,post){
        let postPromise = new Promise((resolve, reject) => {
            Meteor.call('post.edit',postId,post,(err,result)=>{
                resolve(result)
                reject();
            })
        });
        let result = await postPromise;
        return (result);
    }
}
export default PostServices;
