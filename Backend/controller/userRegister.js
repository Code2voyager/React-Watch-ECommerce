
const userModel = require("../models/user.js");


const userRegister =async(req,res)=>{
    const uservalue = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber:req.body.phoneNumber,
        age:req.body.age,
        dob:req.body.dob,
        gender:req.body.gender,
        address:req.body.address,
        city:req.body.city,
        zipCode:req.body.zipCode

    };
    try {
        const  user = await userModel.findOne({email:uservalue.email});
        if(user){
            res.json("email exists");
        }
        else{
            await userModel.create(uservalue);
            res.json("user created");
        }
    }
    catch(error){
        res.status(500).json(error);
        console.log(error);
        
    }

}
module.exports = userRegister;