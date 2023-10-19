import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth : AngularFireAuth,
    private firebaseSvc : FirebaseService,
    private utilsSvc : UtilsService){

    }

  ngOnInit() {
  }


  //============== Cerrar Sesión =================================
  signOut(){
    this.firebaseSvc.signOut();
  }

}
