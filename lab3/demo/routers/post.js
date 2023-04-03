const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/",  async (req, res)=> {
  // Post.find({}, function (err, users) {
  //   if (!err) return res.json(users);
  //   res.status(500).send(err.message);
  // }).populate("Auther");
  try {
    const post = await Post.find({}).populate("Auther");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error.message)
  }
});

router.get("/:id",  async (req, res) => {
  // Post.find({ _id: req.params.id }, (err, post) => {
  //   if (!err) return res.json(post);
  //   res.status(500).send(err.message);
  // }).populate("Auther");
  try {
    const Post = await Post.find({ _id: req.params.id }).populate("Auther");
    res.status(200).json(Post);
  } catch (error) {
     res.status(500).send(error.message);
  }
});

router.post("/", async(req, res) => {
  // Post.create(req.body, (err, user) => {
  //   if (!err) return res.json(user);
  //   res.status(500).send(err.message);
  // });
  try {
    const Post = await Post.create(req.body);
    res.status(200).json(Post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id",async (req, res) => {
  // Post.deleteOne({ _id: req.params.id }, (err) => {
  //   if (!err) return res.json("Delete Done");
  //   res.status(500).send(err.message);
  // });
  try {
    Post.deleteOne({ _id: req.params.id })
    res.status(200).send("Delete Done");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id",async(req, res) => {
  // Post.updateOne({ _id: req.params.id }, req.body, (err) => {
  //   if (!err) return res.json("update Done");
  //   res.status(500).send(err.message);
  // });
  try {
    const post = await Post.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
