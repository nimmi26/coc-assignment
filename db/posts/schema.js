import SimplSchema from 'simpl-schema';
SimplSchema.extendOptions(['autoform','error']);
export default new SimplSchema({
    title: {
    	type: String,
    	required: true
    },
    description: {
    	type: String,
        required: true
    },
    userId: {
      type: String,
      optional: true
    },
    //added three new coloum in post collection  
    //1- views for calculating views for each post
    views: {
    	type: Number,
    	defaultValue: 0,
    },
    //2-category dropdown each and every post belongs to a category(type)
    category: {
	  type: String,
	  label: "Category",
	  allowedValues: ['Nature','Psychology','Music','Programming','Project Management','Other']
	},
    //-3- automated value of created date for each post
    createdAt: {
    	type: Date,
    	autoValue: function(){
    		return new Date();
    	}
    }
});
