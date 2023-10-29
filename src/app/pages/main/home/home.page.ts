import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any [] =[];
  constructor(private auth : AngularFireAuth,
    private firebaseSvc : FirebaseService,
    private utilsSvc : UtilsService,
    private http:HttpClient){


    }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const url = "https://apitiendamura-default-rtdb.firebaseio.com/products.json"
    this.http.get(url).subscribe(
      (data: any) =>{
        this.products = Object.values(data);
        console.log("productos", this.products)
      }
    )
  }


  

  //============== Cerrar Sesión =================================
  signOut(){
    this.firebaseSvc.signOut();
  }

  //============== agregar o actualizar producto ============================

  addUpdateProduct(){

    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    });
  }


  
}
