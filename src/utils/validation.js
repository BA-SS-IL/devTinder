const validator = require('validator');

const validateSignUpData = (req)=>{
    const {firstName,lastName,password,emailId,skills} = req.body;
    
    if(!firstName || !lastName){
        throw new Error("please enter name");      
    }
    else if(firstName.length<1 || firstName.length>50){
        throw new Error("firsname should be 1-50 lettters"); 
    }
    else if(lastName.length < 1 || lastName.length>50){
        throw new Error("last name should be 1-50 letters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("emaiil is not valid");  
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }
    else if(skills.length>5){
        throw new Error("skill is morethan 5 is not allowed");  
    }
}

module.exports ={
    validateSignUpData,
}