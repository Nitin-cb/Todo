const express=require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/dbconnect')
const app=express();

dotenv.config();
connectDB();

const PORT=process.env.PORT||5001
app.use(express.json())

app.use('/task',require('./routes/todoroutes'))
app.use('/users',require('./routes/userroutes'))

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})