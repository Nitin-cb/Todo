const express=require('express');
const router=express.Router();
const{getTask,getUniqueTask,createTask,updateTask,deleteTask}=require('../controllers/todoControllers');
const validateToken = require('../middleware/tokenValidate');

// router.use(validateToken)
router.get("/",validateToken,getTask)

router.get('/:id',validateToken,getUniqueTask)

router.post('/',createTask)

router.put('/:id',updateTask)

router.delete('/:id',deleteTask)

module.exports=router;