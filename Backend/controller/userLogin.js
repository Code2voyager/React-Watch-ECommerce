const userModel = require("../models/user.js");
const UserModel = require("../models/user.js");
const bcrypt = require("bcryptjs");


const userLogin = async(req,res)=>{
    const userValue ={
        email: req.body.email,
        password: req.body.password,
    };

    try{
        //const user = await UserModel.findOne({email:userValue.email});
        
            const check = await userModel.findOne({email:userValue.email});
            if(check){
                const chkPassword = await bcrypt.compare(userValue.password,check.password);
                if(chkPassword){
                    req.session.userId = check._id;
                    const user = await userModel .findOne({_id:req.session.userId})
                    const userData = [{
                        _id: user._id,
                        firstName :user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        age: user.age,
                    }]
                    res.json(userData);
                }else{
                    res.json("Invalid password");
                }
            }else{
                res.json("notExists");
            }
        
    }catch(error){
        console.error(error);
    }
}
module.exports = userLogin;