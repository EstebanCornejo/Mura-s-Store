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
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required, Validators.minLength(1)])
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

  crearProducto(){
    this.utilsSvc.presentToast({
      message: "Producto creado exitosamente",
      duration: 2500,
      color: 'primary',
      position: 'middle',
      icon: 'alert-circle-outline'
    })
    this.form.reset();
  }

  }
  




