const RegisterUser = require('../models/customerReg');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../config/env");

exports.registerUser = async (req, res) => {
  try {
    const regdetails = new RegisterUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobileno: req.body.mobileno,
    });

    const Regres = await regdetails.save();

    if (!Regres) {
      return res.status(400).json({ message: 'User not inserted' });
    }

    res.json(Regres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const LoginUser = require('../models/customerReg');

exports.loginUser = async (req, res) => {
  try {
    const res1 = await LoginUser.findOne({
      email: req.body.email,
    });

    if (!res1) {
      return res.send({
        msg: 'User not found',
        status: '0',
      });
    }

    if (res1.password === req.body.password) {
      const payload = {
        id: res1._id,
        email: res1.email,
        name: res1.name,
      };

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      return res.send({
        msg: 'login successfully',
        status: '1',
        token,
        id: res1._id,
        name: res1.name,
        email: res1.email,
      });
    }

    return res.send({
      msg: 'login not successfully',
      status: '0',
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
