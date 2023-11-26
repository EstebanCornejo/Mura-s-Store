import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class  ApiService  {

  constructor(private http:HttpClient) { }
  listarProductos(): Observable<Product>{
    return this.http.get<Product>("https://apitiendamura-default-rtdb.firebaseio.com/products.json")
  }
  verProductos(id:Number):Observable<Product>{
    return this.http.get<Product>('https://apitiendamura-default-rtdb.firebaseio.com/products.json/'+id)
  }
  
  creaProducto(newProduct:Product):Observable<Product>{
    return this.http.post<Product>("https://apitiendamura-default-rtdb.firebaseio.com/products.json/", newProduct);
  }

  actualizaProducto(product:any):Observable<Product>{
    return this.http.put<Product>("https://apitiendamura-default-rtdb.firebaseio.com/products.json/"+product.id, product);
  }
  eliminaProducto(id:Number): Observable<Product>{
    return this.http.delete<Product>("https://apitiendamura-default-rtdb.firebaseio.com/products.json/"+id)
  }
}
