/*
New schema for comment collection
1-  field type - string
    field name -  comment

2-  field type - string
    field name - userId(Conatain user info who commentd on the field) 

3-  field type - string
    field name - postId(Conatain post info from which post this comment belongs) 

4-  field type - Date
    field name - CreatedAt contain date  

*/


import SimplSchema from 'simpl-schema';
import Meteor from 'meteor/meteor';
SimplSchema.extendOptions(['autoform','error']);
export default new SimplSchema({
    comment: {
    	type: String,
        label: 'Comment',
    	required: true
    },
    userId: {
        type: String,
        optional: true
    },
    postId: {
        type: String,
        optional: true
    },
    createdAt: {
    	type: Date,
    	autoValue: function(){
    		return new Date();
    	}
    }
});
