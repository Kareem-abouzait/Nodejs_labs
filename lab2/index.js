let helper = require("./helper");
let express = require("express");
let port = process.env.PORT || 7000;
let app = express();

app.use(express.json());

app.listen(port);

app.get("/list", (req, res) => {
  let operation = Object.keys(req.query);
  let data = helper.list(operation[0]);
  res.send(JSON.stringify(data));
});

app.get("/check/:id", (req, res) => {
  let id = req.params.id;
  let data = helper.check(id);
  res.send(JSON.stringify(data));
});

app.get("/uncheck/:id", (req, res) => {
  let id = req.params.id;
  let data = helper.uncheck(id);
  res.send(JSON.stringify(data));
});

app.post("/create", (req, res) => {
  let data = req.body;
  helper.add(data);
  res.send(JSON.stringify(data));
  
});

app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let message = helper.remove(id);
  console.log(message);
 res.status(200).send("delete done");
});

app.put("/edit/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let newdata = req.body;
  console.log(newdata);
 helper.edit(id, newdata);
   res.status(200).send(JSON.stringify(newdata));
});
