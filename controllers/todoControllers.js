

const Task=require('../models/taskModel')


//desc Get all task
//route GET/task

const getTask=async(req,res)=>{
    try {
        const tasks=await Task.find({userId:req.user.id})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(400).json(error)
    }

}

//desc Get Unique task
//route GET/task/id

const getUniqueTask=async(req,res)=>{

    try {
        const unique=await Task.findById(req.params.id)
        res.status(200).json(unique);
} catch (error) {
    res.status(400).json(error)
    }
}

//desc Create task
//route POST/task/

const createTask=async(req,res)=>{
    try {
        const{task,desc,intrest}=req.body
        const create=await Task.create({
        task,
        desc,
        intrest,
        userId:req.user.id
    })
    return res.status(201).json({data:create,message:"successful"})
    } catch (error) {
        res.status(400).json(error)
    }    
}

//desc Update task
//route put/task/id

const updateTask=async(req,res)=>{
    try {
        const update=await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new :true}
        )
        res.send(update)
    } catch (error) {
        res.status(400).json(error)
    }
    // res.send(`Update task ${req.params.id}`)
}

//desc Delete task
//route delete/task/id

const deleteTask=async(req,res)=>{
    try {
        const deletes=await Task.deleteOne({_id:req.params.id})
        res.send(deletes)
    } catch (error) {
        res.status(400).json(error)
    }
    
}



module.exports={getTask,getUniqueTask,createTask,updateTask,deleteTask};