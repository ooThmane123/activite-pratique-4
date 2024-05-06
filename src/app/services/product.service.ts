import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
// la communication avec le back-end on les fait dans les services
@Injectable({ // au démarrage il va etre instancier
  providedIn: 'root'
})
export class ProductService {
  private host : string ="http://localhost:8089";

  constructor(private http:HttpClient) {
    // l'injection des dépendances
  }

  public searchProducts(keyword:string="",page : number = 1, size : number = 4){
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'}); // return la reponse http avec headers et son corps
  }

  public handleCheckProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked:!product.checked})
  }

  public deleteProduct(product:Product){
    return this.http.delete<any>(`${this.host}/products/${product.id}`)
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`${this.host}/products/`,
      product);
  }

  /*public searchProducts(keyword:string,page:number,size:number):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }*/
  getProdcutById(prodductId: number):Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${prodductId}`);
  }

  updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }
}
