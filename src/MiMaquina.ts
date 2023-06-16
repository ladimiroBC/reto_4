import scanf from "scanf";

interface IProducto {
  name: string;
  price: number;
  amount: number;
}

interface IOperaciones {
  busquedaProducto(productos: IProducto[], query: string): IProducto[];

  creacionProducto(producto: IProducto): void;

  compraProducto(dinero: number): void;
}

abstract class MaquinaProducto {
  protected productos: IProducto[];
  protected seleccion: string;
  protected billete: number;
  protected instruccion: string;
}

class Maquina extends MaquinaProducto implements IOperaciones {
  protected selectProducto: IProducto[];
  protected accesoProducto: IProducto;
  protected cantidad: number;

  busquedaProducto(productos: IProducto[]): IProducto[] {
    let bandera = true;

    console.log("Ingresa el nombre de un producto");

    let query = (this.seleccion = scanf("%s"));

    while (bandera) {
      if (
        productos.find((p) => {
          return p.name == query;
        })
      ) {
        this.selectProducto = productos.filter((p) => {
          return p.name === query;
        });

        console.log(this.selectProducto);
        bandera = false;
      } else {
        console.log("El producto ingresado no se encuentra registrado");
        console.log("Ingresa el nombre de un producto");

        query = this.seleccion = scanf("%s");
      }
    }

    return this.selectProducto;
  }

  creacionProducto(producto: IProducto): void {
    this.productos.push(producto);
  }

  compraProducto(): void {
    console.log("Ingresa el billete para la compra");

    let dinero = (this.billete = scanf("%d"));

    this.accesoProducto = this.selectProducto[0];

    let bandera = true;

    while (bandera) {
      this.cantidadProducto();
      if ((this.accesoProducto.price*this.cantidad) <= dinero) {
        let devolucion = dinero - this.accesoProducto.price;

        console.log("***Venta Existosa***");
        console.log(`Producto ${this.accesoProducto.name} vendida`);
        console.log(`Cantidad vendida ${this.cantidad}`);
        console.log(`Devolucion $ ${devolucion}`);

        bandera = false;
      } else {
        console.log("Insuficiente fondo para obtener el producto");
        console.log("Ingresa el billete para la compra");

        dinero = this.billete = scanf("%d");
      }
    }
  }

  cantidadProducto(): void {
    console.log("Ingrese la cantidad deseada");
    this.cantidad = scanf("%d");

    let bandera = true;

    while (bandera) {
      if (this.accesoProducto.amount >= this.cantidad) {
        let newAmount = this.accesoProducto.amount - this.cantidad;

        this.accesoProducto.amount = newAmount;

        bandera = false;
      } else {
        console.log("No tenemos la cantidad del producto solicitado");
        console.log("Ingrese nuevamente la cantidad deseada");
        this.cantidad = scanf("%d");
      }
    }
  }
}

interface IMenuMaquina {
  verProductos(): void;

  seleccionarProducto(): void;

  ingresarBillete(): void;

  salir(): string;
}

class MiMaquina extends Maquina implements IMenuMaquina {
  private static _instance: MiMaquina;

  private constructor() {
    super();
    this.productos = [];
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  verProductos(): void {
    this.productos.forEach((producto) => console.log(producto));
  }

  seleccionarProducto(): void {
    this.busquedaProducto(this.obtenerProductos);
  }

  ingresarBillete(): void {
    this.compraProducto();
  }

  salir(): string {
    console.log("Quiere seguir en nuestra aplicacion, digite 'si' para continuar, 'no' para salir");
    
    this.instruccion = scanf("%s");

    return this.instruccion;
  }

  public get obtenerProductos(): IProducto[] {
    return this.productos;
  }
}

const todaySold: MiMaquina = MiMaquina.Instance;

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
while(bandera==="si"){
    todaySold.verProductos();
    
    todaySold.seleccionarProducto();
    
    todaySold.ingresarBillete();
    
    let instruccion = todaySold.salir();
    
    bandera = instruccion;
}
console.log("Gracias por utilizar nuestra maquina, vuelva pronto");
