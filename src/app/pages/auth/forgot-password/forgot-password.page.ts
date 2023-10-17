import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private firebaseSvc: FirebaseService,
              private utilsSvc: UtilsService) {
  }
  //firebaseSvc = Inject(FirebaseService);
  //utilsSvc = Inject(UtilsService);

  ngOnInit() {
  }


  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      
    }try{
      const sendEmail = this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(async error =>{
        console.log(error);
  
      await sendEmail;

    }).finally(() => {

    })
    }catch(e){
      if(e instanceof Error){
        this.utilsSvc.presentToast({
          message: e.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }
      console.log('err');
    }
    finally{
    }
  


  
}


}
