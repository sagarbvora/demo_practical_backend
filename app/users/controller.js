const Users = require('../auth/model');

exports.getAllUsers = async (req, res) => {
    const result = await Users.find({})
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send({
             message: "Some error occurred while retrieving data."
         });
    }
};

// Find a single userId with a
exports.findUserData = async (req, res) => {
    const result = await Users.findOne({_id: req.params.id});
    if (result){
        res.status(200).send(result);
    } else{
        res.status(400).send({
            message: "Something went wrong "
        });
    }
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
// Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    const result = await Users.findByIdAndUpdate({_id: req.params.id}, req.body);
    console.log("result",result)
    if (result) {
        res.status(200).send(result);
    } else {
         res.status(400).send({msg: "something went wrong"});
    }
};

// Delete a note with the specified noteId in the request
exports.deleteUser = async (req, res) => {
    const result = await Users.findByIdAndRemove(req.params.id);
    if (result) {
         res.status(200).send({message: "Record deleted successfully!"});
    } else {
        res.status(400).send({message: "Something went wrong"});
    }
};