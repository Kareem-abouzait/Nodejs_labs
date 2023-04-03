let fs = require("fs");
let path = "./db.json";

// for convert file exisit from call back function  or  sync function to async function
async function checkFileAsync(path) {
  return new Promise((resolve, reject) => {
    
    if (fs.existsSync(path)) {
      resolve(true);
    } else {
      reject(new Error());
    }
  });
}

async function checkFilOrnotAndCreate() {
  if (!(await checkFileAsync(path))) {
    // fs.writeFileSync(path, JSON.stringify([]));
    await writeFileAsync(path, JSON.stringify([]));
  }
}
checkFilOrnotAndCreate();

// for convert file write  from call back function  or  sync function to async function
async function writeFileAsync(path, data) {
  return new Promise(function (resolve, reject) {
    fs.write(path, data, (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
}
//  for convert file reade  from call back function  or  sync function to async function
async function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err,data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

/*****function for find max id  */
function getMaxId(arrOfObj) {
  let valuesId = arrOfObj.map((obj) => obj.id);
  let maxId = Math.max.apply(Math, valuesId);
  if (maxId == -Infinity) maxId = 0;
  return maxId;
}

async function add(obj) {
  // let jsonData = fs.readFileSync(path, "utf8");
  let jsonData = await readFileAsync(path);
  let oldData = JSON.parse(jsonData);
  var maxId = getMaxId(oldData);
  let data = {
    id: maxId + 1,
    title: obj.title,
    body: obj.body,
    check: JSON.parse(obj.check),
  };
  oldData.push(data);
  // fs.writeFileSync(path, JSON.stringify(oldData));
  writeFileAsync(path, JSON.stringify(oldData));
}

async function remove(obj) {
  // let jsonData = fs.readFileSync(path, "utf8");
  let jsonData = await readFileAsync(path);
  let oldData = JSON.parse(jsonData);
  let newData = oldData.filter((oldObj) => oldObj.id != obj.id);
  // fs.writeFileSync(path, JSON.stringify(newData));
  writeFileAsync(path, JSON.stringify(oldData));
}

async function edit(obj) {
  // let jsonData = fs.readFileSync(path, "utf8");
  let jsonData = await readFileAsync(path);
  let oldData = JSON.parse(jsonData);
  oldData = oldData.map((oldObj) => {
    if (oldObj.id == obj.id) {
      oldObj.title = obj.title;
      oldObj.body = obj.body;
      oldObj.check = JSON.parse(obj.check);
    }
    return oldObj;
  });
  // fs.writeFileSync(path, JSON.stringify(oldData));
  writeFileAsync(path, JSON.stringify(oldData));
}

async function list(operation) {
 console.log(Object.keys(operation));
  if (Object.values(operation) == "all") {
      console.log("TSET");
    // let data = fs.readFileSync(path, "utf-8");
    let data = await readFileAsync(path);
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
  }
  if (Object.keys(operation) == "checked") {
    // let data = fs.readFileSync(path, "utf-8");
    let data = await readFileAsync(path);
    data = JSON.parse(data);
    data = data.filter((obj) => obj.check == true);
    console.log(data);
  }
  if (Object.keys(operation) == "unchecked") {
    let data = fs.readFileSync(path, "utf-8");
    data = JSON.parse(data);
    data = data.filter((obj) => obj.check == false);
    console.log(data);
  }
}

async function check(obj) {
  // let data = fs.readFileSync(path, "utf-8");
  let data = await readFileAsync(path);
  data = JSON.parse(data);
  data = data.filter((oldObj) => oldObj.id == obj.id);
  data.forEach((element) => {
    if (element.check == true) {
      console.log("check : " + element.check);
    } else {
      console.log("its not yet checked");
    }
  });
}

async function uncheck(obj) {
  // let data = fs.readFileSync(path, "utf-8");
  let data = await readFileAsync(path);
  data = JSON.parse(data);
  data = data.filter((oldObj) => oldObj.id == obj.id);
  data.forEach((element) => {
    if (element.check == false) {
      console.log("uncheck : " + element.check);
    } else {
      console.log("its already checked");
    }
  });
}

module.exports = {
  add,
  remove,
  check,
  uncheck,
  list,
  edit,
  checkFilOrnotAndCreate,
};


