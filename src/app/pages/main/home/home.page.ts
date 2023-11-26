import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { IonModal } from '@ionic/angular';
import { Product } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  products: any [] =[];
  constructor(private auth : AngularFireAuth,
    private firebaseSvc : FirebaseService,
    private utilsSvc : UtilsService,
    private http:HttpClient,
    private api: ApiService) {


    }

  ngOnInit() {
    this.getProducts();
  }

  closeModal() {
    this.modal.dismiss();
  }

  // getProducts() {
  //   const url = "https://apitiendamura-default-rtdb.firebaseio.com/products.json"
  //   this.http.get(url).subscribe(
  //     (data: any) =>{
  //       this.products = Object.values(data);
  //       console.log("productos", this.products)
  //     }
  //   )
  // }

  getProducts() {
    this.api.listarProductos().subscribe((res)=>{
      let listString=JSON.stringify(res)
      this.products=JSON.parse(listString)
      console.log(this.products)
  },
    (err)=>{
      console.log(err.message)
    })
  }

  // verProducts(id:String){
  //   return this.http.get<Product>('https://apitiendamura-default-rtdb.firebaseio.com/products.json/'+id)
  // }

  // creaProducts(newProduct:Product) {
  //   const url = "https://apitiendamura-default-rtdb.firebaseio.com/products.json/"
  //   this.http.post<Product>(url, newProduct).subscribe(
  //     (data: any) =>{
  //       this.products = Object.values(data);
  //       console.log("productos", this.products)
  //     }
  //   )
  // }


  

  //============== Cerrar Sesión =================================
  

  //============== agregar o actualizar producto ============================

  addUpdateProduct(){

    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    });
  }


  
}
