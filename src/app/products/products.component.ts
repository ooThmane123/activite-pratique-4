import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  //variable de type Observable par convention on aime beaucoup généralement utiliser var_name$
  //products$! :Observable<Array<Product>>; //! => dire au compilateur tpescipt ignore meme si j'ai pas initialisé
  constructor(private productService:ProductService,private router:Router,public appState:AppStateService) {
    // public => pour on peut l'utilisze directement dans la partie template
  }
  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(){
    /*this.appState.setProductState({
      status:"LOADING"
    });*/

    this.productService.searchProducts(
      this.appState.productState.keyword,
      this.appState.productState.currentPage,
      this.appState.productState.pageSize).subscribe({
      next: (resp) => {
        /*console.log(resp.headers.get('x-total-count'))
        console.log(resp.body)*/

        let products = resp.body as Product[]; // as Product[] => je qais que c'est un tableau de produit
        let totalProducts:number = parseInt(resp.headers.get('x-total-count')!); //! => je demande de compilateur d'ignorer parce que je sais que ça c'est une attribut qui contient un entier
        //this.appState.productState.totalProducts=totalProducts;
        let totalPages=Math.floor(totalProducts/this.appState.productState.pageSize);
        if(totalProducts%this.appState.productState.pageSize!=0){
          ++totalPages;
        }
        this.appState.setProductState({
          products:products,
          totalProducts:totalProducts,
          totalPages:totalPages,
          status:"LOADED"
        })
        console.log(resp.headers.get('x-total-count'))
        console.log(totalProducts)
      },
      error : err => {
        this.appState.setProductState({
          status:"ERROR",
          errorMessage:err
        })
      }
    })
    //this.products$ = this.productService.getProducts();
  }


  handleCheckProduct(product: Product) {
    //put ça permet de changer tous les attributs
    // on va utiliser patch car on va changer just attribut checked
    this.productService.handleCheckProduct(product).subscribe({
      next: updatedProduct => {
        product.checked=!product.checked;
        //this.getProducts();
      },
      error : err => {
        console.log(err);
      }
    })
  }


  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        //this.appState.productState.products = this.appState.productState.products.filter((p:any)=>p.id!=product.id)
        this.searchProducts();
      }
    })
  }

  /*searchProducts() {
    this.currentPage=1;
    this.totalPages=0;
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next : value => {
        this.products=value;
      }
    })
  }*/

  handleGoToPage(page: number) {
    this.appState.productState.currentPage=page;
    this.searchProducts()
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
}
