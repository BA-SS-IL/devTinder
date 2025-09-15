 const adminAuth = (req,res,next)=>{
    console.log('admin authentication checking')
    const token = 'xyz';
    const isAdminAuthorized = token === 'xyz'
    
    if(!isAdminAuthorized){
        res.status(401).send('UnAuthorized Request')
    }else{
        next();
    }
}


 const userAuth = (req,res,next)=>{
    console.log('user authentication checking')
    const token = 'xyzsa';
    const isUserAuthorized = token === 'xyz'
    
    if(!isUserAuthorized){
        res.status(401).send('UnAuthorized Request')
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}