const repl = require("repl");


var warehouses = {
}

var catlog = {

}
function makeNameForWarehouse() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
    text += possible. charAt(Math. floor(Math. random() * possible. length));
    return text;
}

function addProduct(productName,sku) {   
    if(sku in catlog){
        console.log(`ERROR EXISTING PRODUCT, PRODUCT WITH SKU ${sku} ALREADY EXISTS`)
        return 
    }
    else{
    catlog[sku.replace(' ','')] = productName
    }
    
}
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
function stock(sku,warehousenumber,quantity) {
    let productTobeAdded = {}
    productTobeAdded['sku'] = sku;
    productTobeAdded['name'] = catlog[sku]
    productTobeAdded['quantity'] = parseInt(quantity);
    warehouses[warehousenumber]['product'][sku] = productTobeAdded
}

function unstock(sku,warehousesnumber,quantityTobeRemoved) {
    let currentQuantity = warehouses[warehousesnumber]['product'][sku]['quantity']
    const updatedQuantity = (currentQuantity - parseInt(quantityTobeRemoved)) > 0?currentQuantity - parseInt(quantityTobeRemoved):0;
    let updatedProductTobeAdded = {}
    updatedProductTobeAdded[sku] = sku
    updatedProductTobeAdded['name'] = catlog[sku]
    updatedProductTobeAdded['quantity'] = updatedQuantity
    warehouses[warehousenumber]['product'][sku] = updatedProductTobeAdded
}

function listProducts() {
    let skus = Object.keys(catlog)
    skus.forEach((sku)=>{
        console.log(catlog[sku] + " " + sku)
    })
    
}
function listWarehouses() {
    let warehouse = Object.keys(warehouses)
    console.log("WAREHOUSES")
    warehouse.forEach((k)=>console.log(k))
    
}

function listWarehouse(warehousenumber) {
    var obj = warehouses[parseInt(warehousenumber)]['product'];
    console.log(warehouses[parseInt(warehousenumber)])
    console.log("ITEM NAME              ITEM_SKU")
    Object.keys(obj).forEach(function(key) {
        console.log(obj[key].name + "              "+key)
        console.log(obj[key].quantity)
    });
    
    // warehouses[parseInt(warehousenumber)]['product'].forEach((k)=>{
    //     console.log(k.name + "              "+k.sku)
    //     console.log(k.quantity)
    // })
}




function checkFunction(uInput,datastore) {
    const request = uInput.split(" ")
    if((request[0] + request[1]) == "ADDWAREHOUSE") {
        addWarehouse(request[2],warehouses);
    }
    if((request[0] + request[1]) == "ADDPRODUCT") {
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


}


repl.start({ prompt: "", eval: checkFunction});
repl

