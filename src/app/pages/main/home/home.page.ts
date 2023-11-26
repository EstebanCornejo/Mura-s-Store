import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfiniteScrollCustomEvent, IonModal, LoadingController } from '@ionic/angular';
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
    private api: ApiService,
    private loadingCtr: LoadingController) {


    }

  ngOnInit() {
    this.getProducts();
  }

  closeModal() {
    this.modal.dismiss();
  }




  async getProducts(event?:InfiniteScrollCustomEvent){
    const loading=await this.loadingCtr.create({
      message:"Cargando Productos.....",
      spinner:"bubbles"
    });
    await loading.present();
    this.api.listarProductos().subscribe(
      (res)=>{
        loading.dismiss();
        let listString=JSON.stringify(res)
        this.products=JSON.parse(listString)
        event?.target.complete();
    },
    (err)=>{
      console.log(err.message)
      loading.dismiss();
    }
    )
  }




  

  //============== Cerrar Sesión =================================
  

  //============== agregar o actualizar producto ============================

  addUpdateProduct(){

    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    });
  }


  
}
