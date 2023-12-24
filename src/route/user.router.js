const express = require('express')
const router= express.Router();

const {insertUser, getUserByEmail} = require("../../model/user/user.model");
const { hashPassword,comparePassword } = require('../../model/help/bcrypt.help');
const {createJWT,createrefreshJWT}=require('../../model/help/jwt.help')
router.post("/",async(req,res)=>{
    const { name, company, address, phone, email, password } = req.body;
    try {
		const hashedPass = await hashPassword(password);

		const newUserObj = {
			name,
			company,
			address,
			phone,
			email,
			password: hashedPass,
		};
		const result = await insertUser(newUserObj);


		res.json({ status: "success", message: "New user created", result });

    }  catch (error) {
		console.log(error);

		let message =
			"Unable to create new user at the moment, Please try agin or contact administration!";
		if (error.message.includes("duplicate key error collection")) {
			message = "this email already has an account";
		}
		res.json({ status: "error", message });
	}
})
router.post("/login",async(req,res)=>{
const {email, password }=req.body;
if(!email || !password){
	return res.json({status:"error",message:"invalid form"})
}

const userEmail = await getUserByEmail(email)

const passFromDb = userEmail && userEmail._id ? userEmail.password : null 
if (!passFromDb) {
return res.json({status:"error",message:"invalid email or password"})
	
}
const result =await comparePassword(password, passFromDb)
console.log(result);

if (!result) {
	return res.json({status:"error",message:'invalid email or password'})
}
const accesJWT = await createJWT(userEmail.email)
const refreshJWT = await createrefreshJWT(userEmail.email)

res.json({
	status:"succes",
	message:"login succes",
	accesJWT,
	refreshJWT,
})
})

router.all('/',(req,res)=>{
    res.json({message:'return from user'})
})

module.exports = router