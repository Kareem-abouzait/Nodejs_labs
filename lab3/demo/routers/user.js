const express = require("express");
const router = express.Router();
const User = require('../models/user');


router.get("/", async (req, res) => {
  // for callback function
  // User.find({}, (err,users) => {
  //       if (!err) return res.json(users);
  //       res.status(500).send(err.message);
  // })
  // for async await  and blocking code for logic by key word await
  try {
    const users = await User.find({})
   
    res.status(200).json(users);
  } catch (err) { 
    res.status(500).send(err.message);
  }
  // for async and not blocking code for logic 
//  User.find({}).then((users) => { res.status(200).json(users) })
//     .catch((err) => { res.status(500).send(err.message) })

  
});

router.get("/:id", async (req, res) => {
  // User.findById({ _id: req.params.id }, (err,user) => {
  //       if (!err) return res.json(user);
  //       res.status(500).send(err.message);
  // })
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
  
});

router.post("/", async (req, res) => {
  // User.create(req.body, (err, user) => {
  //   if (!err) return res.json(user);
  //   res.status(500).send(err.message)
  // })
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err.message)
  }
});

router.put("/:id", async (req, res) => {
  // User.updateOne({ _id: req.params.id }, req.body,(err,user) => {
  //       if (!err) return res.json("update Done");
  //       res.status(500).send(err.message);
  // })
  try {
    
    const user = await User.findOneAndUpdate({ _id: req.params.id },req.body,{returnOriginal:false})
    res.status(200).json(user);
    
  } catch (err) { 
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  // User.deleteOne({ _id: req.params.id }, (err) => {
  //       if (!err) return res.json("Delete Done");
  //       res.status(500).send(err.message);
  // })
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).send("Delete Done");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;

