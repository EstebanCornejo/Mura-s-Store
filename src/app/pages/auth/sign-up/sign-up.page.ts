import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
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

        
    try{
      const signResponse = await this.firebaseSvc.signUp(this.form.value as User)

      let uid = signResponse.user.uid;   
      this.form.controls.uid.setValue(uid);
      this.setUserInfo(uid); 
      //const updateResponse =  await this.firebaseSvc.updateUser(this.form.value.name);
      console.log('exito');
    }
    catch(e){
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
      loading.dismiss();
    }
  }

}

async setUserInfo(uid: string) {
  if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    let path = `users/${uid}` ;
    delete this.form.value.password;
    
  try{
    const signResponse = await this.firebaseSvc.setDocument(path, this.form.value)
    //const updateResponse =  await this.firebaseSvc.updateUser(this.form.value.name);
    
    const saveInLocalStorage = await this.utilsSvc.saveInLocalStorage('user', this.form.value)
    this.utilsSvc.routerLink('/main/home');
    this.form.reset();
    console.log('exito');


  }
  catch(e){
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
    loading.dismiss();
  }
}

}
}
