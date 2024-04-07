export const ApiWebURL = "https://servicios.campus.pe/"

export const agregarCarrito = (item, cantProducto) =>   {
    item.cantidad = Number(cantProducto)  //1
    console.log("Acá veamos: ",item)
    item.precio = item.preciorebajado === "0" ? item.precio : item.preciorebajado
    console.log(item)
    let carrito = []
    if(sessionStorage.getItem("carritocompras")){
        //console.log(carrito)
        carrito = JSON.parse(sessionStorage.getItem("carritocompras"))
        let index = -1
        for(let i=0; i<carrito.length; i++){ //1<1
            //if(2===1)---->index=0
            if(item.idproducto === carrito[i].idproducto){
                index = i
                break
            }
        }
        if(index === -1 ){
            carrito.push(item)
        }
        else{
            //1 += 1 =2
            carrito[index].cantidad += Number(cantProducto)
        }
    }
    else{
        carrito.push(item)
    }
    
    sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
    console.log(carrito)
}


