const express = require("express");
const router = express.Router();
const User = require('../models/user');

router.get("/", (req, res) => {
  User.find({}, (err,users) => {
        if (!err) return res.json(users);
        res.status(500).send(err.message);
  })
});

router.get("/:id", (req, res) => {
  User.findById({ _id: req.params.id }, (err,user) => { 
        if (!err) return res.json(user);
        res.status(500).send(err.message);
  })
});

router.post("/", (req, res) => {
  User.create(req.body, (err, user) => { 
    if (!err) return res.json(user);
    res.status(500).send(err.message)
  })
});

router.put("/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body,(err,user) => { 
        if (!err) return res.json("update Done");
        res.status(500).send(err.message);
  })
});

router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
        if (!err) return res.json("Delete Done");
        res.status(500).send(err.message);
  })
});
module.exports = router;
