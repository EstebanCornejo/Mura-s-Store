import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, signOut } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  ngOnInit() {
    this.name = this.firebaseSvc.getAuth().displayName;
    this.email = this.firebaseSvc.getAuth().email;
  }




  signOut(){
    this.firebaseSvc.signOut();
    localStorage.removeItem('ingresado')
  }
}
