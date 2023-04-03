let fs = require("fs");
let path = "./db.json";

function checkFilOrnotAndCreate() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
}
checkFilOrnotAndCreate();

/*****function for find max id  */
function getMaxId(arrOfObj) {
  let valuesId = arrOfObj.map((obj) => obj.id);
  let maxId = Math.max.apply(Math, valuesId);
  if (maxId == -Infinity) maxId = 0;
  return maxId;
}

function add(obj) {
  let jsonData = fs.readFileSync(path, "utf8");
  let oldData = JSON.parse(jsonData);
  var maxId = getMaxId(oldData);
  let data = {
    id: maxId + 1,
    title: obj.title,
    body: obj.body,
    check: JSON.parse(obj.check),
  };
  oldData.push(data);
  fs.writeFileSync(path, JSON.stringify(oldData));
}

function remove(id) {
  let jsonData = fs.readFileSync(path, "utf8");
  let oldData = JSON.parse(jsonData);
  let newData = oldData.filter((oldObj) => oldObj.id != id);
    fs.writeFileSync(path, JSON.stringify(newData));
    let message = "Removed to do list "
    return message;
}

function edit(id,obj) {
  let jsonData = fs.readFileSync(path, "utf8");
  let oldData = JSON.parse(jsonData);
  oldData = oldData.map((oldObj) => {
    if (oldObj.id == id) {
      oldObj.title = obj.title;
      oldObj.body = obj.body;
      oldObj.check = JSON.parse(obj.check);
    }
    return oldObj;
  });
    fs.writeFileSync(path, JSON.stringify(oldData));
    let message = "Updated done";
    return message;
}

function list(operation) {
  if (operation =="all") {
    let data = fs.readFileSync(path, "utf-8");
    data = JSON.parse(data);
      return data;
  }
  if (operation == "check") {
    let data = fs.readFileSync(path, "utf-8");
    data = JSON.parse(data);
    data = data.filter((obj) => obj.check == true);
    return data;
  }
  if (operation == "uncheck") {
    let data = fs.readFileSync(path, "utf-8");
    data = JSON.parse(data);
    data = data.filter((obj) => obj.check == false);
    return data;
  }
}

function check(id) {
    
  let data = fs.readFileSync(path, "utf-8");
  data = JSON.parse(data);
    data = data.filter((oldObj) => oldObj.id == id);
       let message = "";
    data.forEach((element) => {
      if (element.check == true) {
            message = `check : ${element.check}`;
          console.log(message);
      } else {
           message = "its not yet checked";
        
    }
    });
    return message;
}

function uncheck(id) {
  let data = fs.readFileSync(path, "utf-8");
  data = JSON.parse(data);
    data = data.filter((oldObj) => oldObj.id == id);
    let message = "";
  data.forEach((element) => {
    if (element.check == false) {
       message="uncheck : " + true
    } else {
      message="its already checked"
    }
  });
    return message;
}

module.exports = { add, remove, check, uncheck, list, edit };
