const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    password:{type:String},
    phoneNumber:{type:String},
    age:{type:String},
    dob:{type:String},
    gender:{type:String},
    address:{type:String},
    city:{type:String},
    zipCode:{type:String}
    
})

    userSchema.pre("save",function(next){
        const user = this;
        bcrypt.hash(user.password,10,(err,hash)=>{
            user.password = hash;
            next();
        })
    });

const userModel = new mongoose.model("user",userSchema);
module.exports = userModel;