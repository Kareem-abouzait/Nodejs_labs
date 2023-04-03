const express = require("express");
const morgan = require("morgan");
const app = express();
const routerUser = require("./routers/user");
const routerPost = require("./routers/post");
const filelogged = require("fs");
const port = 7000;


app.use(express.json());

//***************for connecting Mongo DB */
const Mongoos = require("mongoose");
Mongoos.connect("mongodb://127.0.0.1:27017/facebook", (err) => {
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

app.use(["/users", "/user"], routerUser);
app.use(["/post", "/posts"], routerPost);

app.listen(port, (err) => {
  // console.log(global.process.env.port);
  if (!err) return console.log(`server listening on ${port}`,port);
  console.log(err);
});
