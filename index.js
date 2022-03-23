/*
Author - Suryansh Soni
date started - 03/21/2022
date finised - 03/22/2022
*/


//Requires repl for running the read evaluation print loop 
const repl = require("repl");

//WAREHOUSE DATA STRUCTURE IN FORM OF DICTIONARY
var warehouses = {
}

//PRODUCT CATLOG DATA STRUCTURE IN FORM OF DICTIONARY
var catlog = {

}
//Generates random name for the warehouse
function makeNameForWarehouse() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
    text += possible. charAt(Math. floor(Math. random() * possible. length));
    return text;
}



//ADD PRODUCT FUNCTION
function addProduct(productName,sku) {   
    if(sku.replace(' ','') in catlog){
        console.log(`ERROR EXISTING PRODUCT, PRODUCT WITH SKU ${sku} ALREADY EXISTS`)
        return 
    }
    else{
    catlog[sku.replace(' ','')] = productName
    }
    
}

//ADD WAREHOUSE FUNCTION 
function addWarehouse(uInput=Number.MAX_SAFE_INTEGER,warehouses) {
    if(uInput in warehouses){
        console.log(`ERROR ADDING WAREHOUSE, WAREHOUSE WITH NUMBER ${uInput} ALREADY EXISTS`)
        return 
    }
    else{
    const name = makeNameForWarehouse()
    let stockvalue = parseInt(uInput);
    let newwarehouse = {warehousename:name,warehousenumber:stockvalue,stock:stockvalue,product:{}}
    warehouses[stockvalue]=(newwarehouse)
    }

}

//STOCK FUNCTION
function stock(sku,warehousenumber,quantity) {
    let productTobeAdded = {}
    productTobeAdded['sku'] = sku;
    productTobeAdded['name'] = catlog[sku]
    productTobeAdded['quantity'] = parseInt(quantity);
    warehouses[warehousenumber]['product'][sku] = productTobeAdded
}

//UNSTOCK FUNCTION 
function unstock(sku,warehousesnumber,quantityTobeRemoved) {
    const warehouse = warehouses[parseInt(warehousesnumber)]
    let currentQuantity = warehouse['product'][sku]['quantity']
    const updatedQuantity = (currentQuantity - parseInt(quantityTobeRemoved)) > 0?currentQuantity - parseInt(quantityTobeRemoved):0;
    let updatedProductTobeAdded = {}
    updatedProductTobeAdded[sku] = sku
    updatedProductTobeAdded['name'] = catlog[sku]
    updatedProductTobeAdded['quantity'] = updatedQuantity
    warehouses[warehousesnumber]['product'][sku] = updatedProductTobeAdded
}

//LIST PRODUCTS FUNCTION
function listProducts() {
    let skus = Object.keys(catlog)
    skus.forEach((sku)=>{
        console.log(catlog[sku] + " " + sku)
    })
    
}

//LIST WAREHOUSES FUNCTION
function listWarehouses() {
    let warehouse = Object.keys(warehouses)
    console.log("WAREHOUSES")
    warehouse.forEach((k)=>console.log(k))
    
}


//LIST WAREHOUSE FUNCTION
function listWarehouse(warehousenumber) {
    var obj = warehouses[parseInt(warehousenumber)]['product'];
    console.log(warehouses[parseInt(warehousenumber)])
    console.log("ITEM NAME              ITEM_SKU")
    Object.keys(obj).forEach(function(key) {
        console.log(obj[key].name + "              "+key)
        console.log(obj[key].quantity)
    });
}



//REPL function 
function checkFunction(uInput,datastore) {
    const request = uInput.split(" ")
    if((request[0] + request[1]) == "ADDWAREHOUSE") {
        addWarehouse(request[2],warehouses);
    }
    else if((request[0] + request[1]) == "ADDPRODUCT") {
        const nameOfProduct = uInput
            .match(/(?:"[^"]*"|^[^"]*$)/)[0]
            .replace(/"/g, "")
        let dataExtracted = uInput.split('"')
        const sku = dataExtracted[2].replace(/\n/g, '')
        addProduct(nameOfProduct,sku);
    }
    else if(request[0] == "LIST" && request[1].replace(/\n/g, '') == "WAREHOUSES") {
        listWarehouses()
    }
    else if(request[0] == "LIST" && request[1].replace(/\n/g, '') == "WAREHOUSE") {
        listWarehouse(request[2])
    }
    else if(request[0] == "LIST" && request[1].replace(/\n/g, '') == "PRODUCTS") {
        listProducts()
    }

    else if(request[0] == "STOCK") {
        stock(request[1],request[2],request[3])
    }
    else if(request[0] == "UNSTOCK") {
        console.log(request)
        unstock(request[1],request[2],request[3])
    }
    else{
        console.log("Invalid Request")
    }


}


repl.start({ prompt: "", eval: checkFunction});
repl

