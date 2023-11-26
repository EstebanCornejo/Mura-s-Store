import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {


  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required,]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    soldUnits: new FormControl('', [Validators.required, Validators.min(0)])
  })

  constructor(private firebaseSvc: FirebaseService,
              private utilsSvc: UtilsService) {
  }
  //firebaseSvc = Inject(FirebaseService);
  //utilsSvc = Inject(UtilsService);

  ngOnInit() {
  }

  //=============== Tomar/seleccionar foto ===============
  
  async takeImage(){
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del producto')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }


  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

        
    try{
      const signResponse = await this.firebaseSvc.signIn(this.form.value as User)

      // let uid = signResponse.user.uid;   
 
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



}


