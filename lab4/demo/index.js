const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const routerUser = require("./routers/user");
const routerPost = require("./routers/post");
const filelogged = require("fs");
const jwt = require("jsonwebtoken");
const port = process.env.PORT
const User = require("./models/user");
const bcrypt = require("bcryptjs");
app.use(express.json());
const Db_url = process.env.Db_url
const auth = require("./middleWare/auth");


//***************for connecting Mongo DB */
const Mongoos = require("mongoose");
const Auth = require("./middleWare/auth");
Mongoos.connect(Db_url, (err) => {
  if (!err) return console.log("connecting to DAtA BAse");
  console.log(err);
});

// midlleware for logged for any req
app.use((req, res, next) => {
  filelogged.appendFile(
    "./public/log.txt",
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
`,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  next();
});

// app.use(["/users", "/user"], routerUser);
app.use(["/post", "/posts"],auth, routerPost);
// app.use("/", auth, (req, res, next) => {
//   res.send("welcome home");
// });
app.listen(port, (err) => {
  if (!err) return console.log(`server listening on ${port}`);
  console.log(err);
});



/********** for auth  */
app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    console.log(req.body);
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
//*  for login ///////

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});