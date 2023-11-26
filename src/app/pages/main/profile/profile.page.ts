import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, signOut } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private firebaseSvc : FirebaseService,
              private utilsSvc: UtilsService,
              private auth : AngularFireAuth) { }

 name: string
 email: String 
 admin: boolean

  ngOnInit() {
    this.name = this.utilsSvc.getFromLocalStorage('user').name;
    this.email = this.utilsSvc.getFromLocalStorage('user').email;
    this.admin = this.utilsSvc.getFromLocalStorage('admin');
  }

  addUpdateProduct(){

    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    });
  }


  signOut(){
    this.firebaseSvc.signOut();
    localStorage.removeItem('ingresado')
    localStorage.removeItem('admin')
  }
}
