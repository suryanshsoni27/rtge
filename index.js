const repl = require("repl");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

global.datastore = {
    warehouses:{
        warehouse:{
            products:[],
            stock:0,
            sku:null,
        }
    }
}

function addProduct(uInput) {   
    datastore.warehouses.warehouse.product.push(uInput)

    
}
function addWarehouse(uInput,datastore) {

}
function stock(uInput,datastore) {

}
function unstock(uInput,datastore) {

}
function listProducts(uInput,datastore) {

}
function listWarehouse(uInput,datastore) {
    console.log(global.datastoredatastore.warehouses.warehouse[0].product);

}

function listWarehouses(uInput,datastore) {

}




function checkFunction(uInput,datastore) {
    const request = uInput.split(" ")
    console.log(request)
    if((request[0] + request[1]) == "ADDWAREHOUSE") {
        addWarehouse(request[2]);
        console.log(request[2])
    }
    else if(request[0] == "LIST" && request[1] == "WAREHOUSE\n") {
        console.log("I AM HERE NOW",request)
        console.log(datastore)
    }


}


repl.start({ prompt: "custom-repl => ", eval: checkFunction});
repl


// function modifyOutput(output) {
//     return output.toUpperCase().red;
//   }