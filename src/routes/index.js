const express=require('express');
const router = express.Router()

const userHandlers=require('../controllers/userController');
router.post('/login',userHandlers.login)
router.post('/signup',userHandlers.signup)
module.exports=router;