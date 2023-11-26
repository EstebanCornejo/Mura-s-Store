import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  product: any;
  constructor(private auth : AngularFireAuth,
              private firebaseSvc : FirebaseService,
              private utilsSvc : UtilsService,
              private http:HttpClient,
              private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    this.getProducts(this.getIdFromURL());
  }

  getIdFromURL(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id=parseInt(arr[2]);
    return id;

  }


  getProducts(id:Number){
    this.api.verProductos(id).subscribe(
    (resp:any)=>{
      //console.log(resp);
      this.product=resp;
    })
  }
}
