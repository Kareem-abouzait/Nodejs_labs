const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", function (req, res) {
  Post.find({}, function (err, users) {
    if (!err) return res.json(users);
    res.status(500).send(err.message);
  }).populate("Auther");
});

router.get("/:id", function (req, res) {
  Post.find({ _id: req.params.id }, (err, post) => {
    if (!err) return res.json(post);
    res.status(500).send(err.message);
  }).populate("Auther");
});

router.post("/", function (req, res) {
  Post.create(req.body, (err, user) => {
    if (!err) return res.json(user);
    res.status(500).send(err.message);
  });
});

router.delete("/:id", function (req, res) {
  Post.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) return res.json("Delete Done");
    res.status(500).send(err.message);
  });
});

router.put("/:id", function (req, res) {
  Post.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (!err) return res.json("update Done");
    res.status(500).send(err.message);
  });
});

module.exports = router;
