exports.sanitizeUser=(user)=>{
    return {_id:user._id,email:user.email,isVerified:user.isVerified,isAdmin:user.isAdmin}
}
exports.sanitizeSubAdmin=(user)=>{
    return {_id:user._id,email:user.email,isVerified:user.isVerified,devices:user.devices,ops:user.opsUsers}
}

exports.sanitizeOps=(user)=>{
    console.log("----santize ops",user);
    return {email:user.email,mobileNumber:user.mobileNumber}
}