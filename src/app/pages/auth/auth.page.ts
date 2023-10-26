import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
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
    this.firebaseSvc.signIn(this.form.value as User).then(res =>{
      this.getUserInfo(res.user.uid);
    }).catch(error =>{
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

    }).finally(() => {
      loading.dismiss();
    })
  }


  
}

async getUserInfo(uid: string) {
  if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    let path = `users/${uid}` ;
    
  try{
      this.firebaseSvc.getDocument(path).then((user: User) => {
      this.utilsSvc.saveInLocalStorage('user', user)
      localStorage.setItem("ingresado", "true");
      this.utilsSvc.routerLink('/main/home');
      this.form.reset();
      console.log('exito');
      this.utilsSvc.presentToast({
        message: `Te damos la bienvenida ${user.name}`,
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'person-circle-outline'
      })
    }

    //const updateResponse =  await this.firebaseSvc.updateUser(this.form.value.name);
    



  )}
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
