const mongoose=require("mongoose")
const {Schema}=mongoose

const versionSchema=new Schema({
    _id:{
        type:String,
        required:true
    },
    version:{}
}) 

module.exports=mongoose.model("Version",versionSchema)