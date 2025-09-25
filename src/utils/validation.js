const validator = require('validator');

const validationSignUpData = (req)=>{
    const {firstName,lastName,emailId,skills,password} = req.body;
    
    if(!firstName || !lastName){
        throw new Error("please enter full name");
    }
    else if(firstName.length < 3 || firstName.length > 50){
        throw new Error("First name should be between 3 and 50 characters");
    }
    else if(lastName.length<1 || lastName.length>50){
        throw new Error("Last name should be between 3 and 50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("the password is not strong");
    }
    else if(skills.length>5){
        throw new Error("skill is morethan 5 ");
    }
}

const validationLoginData = (req)=>{
    const {emailId} = req.body
    if(!validator.isEmail(emailId)){
        throw new Error("invalid emailId");   
    }
}

const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about"
        ,"skills"
    ];
   const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedEditFields.includes(field)
   );

   const {firstName,lastName,emailId,age,gender,photoUrl,about,skills} = req.body;
    if(!firstName || !lastName){
        throw new Error("please enter full name");
    }
    else if(firstName.length<1 || firstName.length>50){
        throw new Error("first name should be between 1 and 50 characters");
    }
    else if(lastName.length<1 || lastName.length>50){
        throw new Error("last name should be between 1 and 50 characters")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email");
    }
    else if(age<18 || age>100){
        throw new Error("age should be between 18 and 100 ");   
    }
   else if (!["male","female","other"].includes(gender)){
    throw new Error("Invalid Gender");
    
   }
    else if(photoUrl && !validator.isURL(photoUrl)){
        throw new Error("Invalid URL");
    }
    else if( about && about.length>100){
        throw new Error("it should be 100 letters maximum");
    }
    else if(skills && skills.length >5){
        throw new Error("only 5 skills");
    }
   return isEditAllowed;
}

validateNewPasswordData = (newPassword)=>{
    
    if(!validator.isStrongPassword(newPassword)){
       throw new Error("Try a strong Password");
    }
}


module.exports = {
    validationSignUpData,
    validationLoginData,
    validateEditProfileData,
    validateNewPasswordData,
}