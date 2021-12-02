require('dotenv').config();
const Users = require('./model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create and Save a new Note
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //Encrypt password
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    // Create a Note
    // Save Note in the database
    let result = {};
    const data = await Users.findOne({email: req.body.email});
    if (data && req.body.isRegistered){
        result = await Users.findOneAndUpdate({email: data.email}, req.body)
    } else {
        result = await Users.create(req.body);
    }
    if (result){
        res.status(201).send(result);
    } else {
         res.status(400).send({
             message: "Some error occurred while creating the Note."
          });
    }
};

//login data
exports.login = async (req, res) => {
       const result = await Users.findOne({email: req.body.email});
       if (result){
             const isMatch = bcrypt.compareSync(req.body.password, result.password);
             if (isMatch) {
                 const token = jwt.sign({email: req.body.email}, process.env.SECRET_KEY);
                 return  res.status(200).send({result, auth:true, token:token, email: req.body.email });
             } else {
                  return res.status(404).send({message: "User Field Are Not Correct"});
             }
       } else {
            res.status(400).send({
                message: "Some error occurred while retrieving login."
            });
       }
};