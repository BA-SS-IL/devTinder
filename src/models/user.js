const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:1,
        maxLength:50,
        trim:true,
        set:(val)=>val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    },
    lastName:{
        type:String,
        required:true,
        minLength:1,
        maxLength:50,
        trim:true,
        set:(val)=>val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:1,
        maxLength:50,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email "+value);
                
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("type strong password "+value);
                
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new console.error('gender not validate');
                
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/isolated-object-avatar-dummy-symbol-260nw-1290296656.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photo URL is invalid "+value );
                
            }
        }
    },
    about:{
        type:String,
        default:'This is a default about of the User'
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true
}
);
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id:user._id},"dev@Tinder4566",{
        expiresIn:"7d"
    });

    return token;
}

userSchema.methods.validatePassword = async function (userInputPassword) {
    const user = this;
    const passwordHash = user.password;

    const isPassword = await bcrypt.compare(userInputPassword,passwordHash);
    
    return isPassword;
}

const User= mongoose.model('User',userSchema);
module.exports = User;