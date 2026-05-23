const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

exports.registerAdmin = async (req, res) => {
    try {
        const regdetails = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, 
        });

        const Regres = await regdetails.save();

        if (!Regres) {
            return res.status(400).json({ message: 'Admin not inserted' });
        }

        res.json(Regres);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const  AdminLogin= require('../models/admin');

exports.loginAdmin = async (req,res)=>{
   try
   {
          // ✅ check req.body first
          if(!req.body){
             return res.status(400).json({message:"Request body missing"});
          }

          let res1 = await AdminLogin.findOne({"email":req.body.email});

          // ✅ check if user exists
          if(!res1){
             return res.status(404).json({"msg":"admin not found","status":"0"});
          }

          console.log("value is ",res1.password)

          if(res1.password == req.body.password)
          {
              const payload = {email: res1.email};
              const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

              res.send({"msg":"login successfully","status":"1","token":token})
          }
          else
          {
             res.send({"msg":"login not successfully","status":"0"})
          }
   }
   catch(err)
   {
        res.status(500).json({message:err.message});
   }
};
