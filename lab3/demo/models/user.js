const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  age: { type: "number" },
});

const userModel = mongoose.model('user', userSchema);

module.exports=userModel;
