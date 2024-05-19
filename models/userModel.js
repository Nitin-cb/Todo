const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please add the username"],
        unique:[true,"email address already taken"]
    },
    password:{
        type:String,
        required:[true,"please add the password"],
    },
},{
    timestamps:true,
})

// UserSchema.pre('save',async(next)=>{
//     if(!this.isModified('password'))return next();
//     const salt=await bcrypt.genSalt(10);
//     this.password=await bcrypt.hash(this.password,salt);
//     next();
// })
// UserSchema.methods.comparePassword=(password)=>{
//     return bcrypt.compare(password,this.password);
// }

module.exports=mongoose.model('User',UserSchema)