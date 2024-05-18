const mongoose=require('mongoose');


const todoSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',required:true
    },
    task:{
        type:String,
        required:true
    },
    desc:{
        type:String,
    },
    intrest:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

module.exports=mongoose.model("Data",todoSchema)