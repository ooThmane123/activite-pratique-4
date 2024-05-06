import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsComponent} from "../products/products.component";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  prodductId! :number;
  public productFormGroup!:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductService,
              private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.prodductId=this.activatedRoute.snapshot.params['id'];
    this.productService.getProdcutById(this.prodductId).subscribe({
      next:(product)=>{
        this.productFormGroup=this.fb.group({
          id:this.fb.control(product.id),
          name:this.fb.control(product.name,Validators.required),
          price:this.fb.control(product.price,[Validators.min(100)]),
          checked:this.fb.control(product.checked),
        })
      },
      error:error => {
        console.log(error);
      }
    });
  }

  updateProduct() {
    let product : Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next:data=>{
        alert(JSON.stringify(data));
      },
      error:error =>{
        console.log(error)
      }
    })
  }
}
