const express = require('express')
const router= express.Router();

router.all('/',(res,req)=>{
    res.json({message:'return from ticket'})
})

module.exports=router