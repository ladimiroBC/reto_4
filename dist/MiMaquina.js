"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scanf_1 = __importDefault(require("scanf"));
class MaquinaProducto {
}
class Maquina extends MaquinaProducto {
    busquedaProducto(productos) {
        let bandera = true;
        console.log("Ingresa el nombre de un producto");
        let query = (this.seleccion = (0, scanf_1.default)("%s"));
        while (bandera) {
            if (productos.find((p) => {
                return p.name == query;
            })) {
                this.selectProducto = productos.filter((p) => {
                    return p.name === query;
                });
                console.log(this.selectProducto);
                bandera = false;
            }
            else {
                console.log("El producto ingresado no se encuentra registrado");
                console.log("Ingresa el nombre de un producto");
                query = this.seleccion = (0, scanf_1.default)("%s");
            }
        }
        return this.selectProducto;
    }
    creacionProducto(producto) {
        this.productos.push(producto);
    }
    compraProducto() {
        console.log("Ingresa el billete para la compra");
        let dinero = (this.billete = (0, scanf_1.default)("%d"));
        this.accesoProducto = this.selectProducto[0];
        let bandera = true;
        while (bandera) {
            this.cantidadProducto();
            if ((this.accesoProducto.price * this.cantidad) <= dinero) {
                let devolucion = dinero - this.accesoProducto.price;
                console.log("***Venta Existosa***");
                console.log(`Producto ${this.accesoProducto.name} vendida`);
                console.log(`Cantidad vendida ${this.cantidad}`);
                console.log(`Devolucion $ ${devolucion}`);
                bandera = false;
            }
            else {
                console.log("Insuficiente fondo para obtener el producto");
                console.log("Ingresa el billete para la compra");
                dinero = this.billete = (0, scanf_1.default)("%d");
            }
        }
    }
    cantidadProducto() {
        console.log("Ingrese la cantidad deseada");
        this.cantidad = (0, scanf_1.default)("%d");
        let bandera = true;
        while (bandera) {
            if (this.accesoProducto.amount >= this.cantidad) {
                let newAmount = this.accesoProducto.amount - this.cantidad;
                this.accesoProducto.amount = newAmount;
                bandera = false;
            }
            else {
                console.log("No tenemos la cantidad del producto solicitado");
                console.log("Ingrese nuevamente la cantidad deseada");
                this.cantidad = (0, scanf_1.default)("%d");
            }
        }
    }
}
class MiMaquina extends Maquina {
    constructor() {
        super();
        this.productos = [];
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    verProductos() {
        this.productos.forEach((producto) => console.log(producto));
    }
    seleccionarProducto() {
        this.busquedaProducto(this.obtenerProductos);
    }
    ingresarBillete() {
        this.compraProducto();
    }
    salir() {
        console.log("Quiere seguir en nuestra aplicacion, digite 'si' para continuar, 'no' para salir");
        this.instruccion = (0, scanf_1.default)("%s");
        return this.instruccion;
    }
    get obtenerProductos() {
        return this.productos;
    }
}
const todaySold = MiMaquina.Instance;
todaySold.creacionProducto({
    name: "pepsi",
    price: 1200,
    amount: 4,
});
todaySold.creacionProducto({
    name: "manzana",
    price: 1000,
    amount: 6,
});
todaySold.creacionProducto({
    name: "sprite",
    price: 1000,
    amount: 2,
});
let bandera = "si";
console.log("***BIENVENIDO A NUESTRA MAQUINA EXPENDEDORA***");
while (bandera === "si") {
    todaySold.verProductos();
    todaySold.seleccionarProducto();
    todaySold.ingresarBillete();
    let instruccion = todaySold.salir();
    bandera = instruccion;
}
console.log("Gracias por utilizar nuestra maquina, vuelva pronto");
