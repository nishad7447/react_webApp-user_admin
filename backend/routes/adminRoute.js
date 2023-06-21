const express = require('express');
const router = express.Router();
const adminController= require('../controllers/adminController')


router.post('/adminlogin',adminController.adminlogin)
router.get('/getUsers',adminController.getUsers)
router.post('/search',adminController.search)
router.put('/editUser/:id',adminController.editUser)
router.delete('/deleteUser/:id',adminController.deleteUser)

module.exports=router