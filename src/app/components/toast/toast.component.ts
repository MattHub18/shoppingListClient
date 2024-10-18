import {Component, OnInit} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {

  constructor(private toastController: ToastController) {}

  /** show toast message **/
  presentToast(message: string, color: string = "danger") {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: color
    }).then(async (toast) => {
      await toast.present();
    });
  }
}
