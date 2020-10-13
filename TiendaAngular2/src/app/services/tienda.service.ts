import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Producto } from '../models/Producto'


@Injectable()
export class TiendaService {
  public catalogo : Producto[]; //Crear arreglo de productos
  public productosCatalogo : Producto[]; //Crear arreglo de productos

  constructor(private http : Http, private router : Router) { }
  //obteniendo el producto
  public getProductos(){
  return this.http.get('https://tienda-angular2.firebaseio.com/productos/.json').map(
    (response : Response) => {
      this.catalogo =  response.json(); 
      this.productosCatalogo = this.catalogo 
    })
  }
  //obtener los detalles del producto
  public getDetalleProductos(idProduct:number) : Producto {
    for(let item of this.productosCatalogo) {
      if(item.id == idProduct) {
        return item;
      }
    }
    return null;
  }
  //inicializando el catalogo
  cargarCatalogo(){
    return this.productosCatalogo
  }
  //filtrando productos
  public filtrarProducto(filtro:string){
  this.productosCatalogo = this.catalogo; 
  filtro.toLowerCase(); 
  let itemMatch : Producto[] = []; 
  for(let item of this.productosCatalogo){ 
    let nombre = item.nombre.toLowerCase(); 
    if(nombre.includes(filtro)){ 
      itemMatch.push(item)} //agregando producto al carrito
    }
    return itemMatch; 
  }
 //actualizando disponibilidad
  actualizarDisponible(id:number, value:number, devolver:boolean = false){
    let catalogo = this.catalogo; //productos disponibles
    for(let itemCatalogo of catalogo){ 
      if (itemCatalogo.id == id){ 
        if(devolver == false){ 
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) - value); //restando la cantidad
        }else{
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) + value); //sumar la cantidad disponible
      }
        this.productosCatalogo = this.catalogo; //actualizar disponibilidad
      }
    }
  }
  
}
