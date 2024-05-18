const express=require('express');
const router=express.Router();
const{getTask,getUniqueTask,createTask,updateTask,deleteTask}=require('../controllers/todoControllers')

router.get("/",getTask)

router.route('/:id').get(getUniqueTask)

router.route('/').post(createTask)

router.route('/:id').put(updateTask)

router.route('/:id').delete(deleteTask)

module.exports=router;