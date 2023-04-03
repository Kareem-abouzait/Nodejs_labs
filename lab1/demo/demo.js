let helper = require('./helper')
function prepareData(data) {
    let obj =data.reduce((prev,elm) => {
        let arr = elm.split('=');
        prev[arr[0]] = arr[1]
        return prev
    },{})
    return obj;
}

 async function main(args) {
    let [, , operation, ...data] = args
    let obj = prepareData(data);
    await helper.checkFilOrnotAndCreate();
    switch (operation)  {
        case "add":
            helper.add(obj)
            break;
        case "edit":
        helper.edit(obj)
            break;
        case "remove":
        helper.remove(obj)
            break;
        case "check":
        helper.check(obj)
            break;
        case "uncheck":
        helper.uncheck(obj)
            break;
        case "list":
            
        helper.list(obj)
            break;
     }
}

main(process.argv);
;