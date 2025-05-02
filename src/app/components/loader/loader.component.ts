import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent  implements OnInit {

  private loading: any;

  constructor(private loadingCtrl: LoadingController) { 
    this.loadingCtrl.create().then((el)=>{
      this.loading = el;
    });
  }

  ngOnInit() {}

  async showLoader(){
    document.querySelector('ion-content').setAttribute('inert', 'true');
    await this.loading.present();
  }

  async hideLoader(){
    await this.loading.dismiss();
    document.querySelector('ion-content').removeAttribute('inert');
  }

}
