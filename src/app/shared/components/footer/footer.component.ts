import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {


  constructor(private utilsSvc : UtilsService) { 
  }

  ngOnInit() {}

  goToPerfil() {
    this.utilsSvc.routerLink('/main/profile')
  }

  goToHome() {
    this.utilsSvc.routerLink('/main/home')
  }

  // goToHelp() {
  //   this.utilsSvc.routerLink('/main/profile')
  // }

}
