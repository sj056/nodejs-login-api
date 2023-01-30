const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String,required:true,unique:true,match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password:{type:String},
    created:{
        type:Date,default:Date.now
    }
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports=mongoose.model('User',userSchema)