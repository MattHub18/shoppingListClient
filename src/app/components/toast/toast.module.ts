import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {ToastComponent} from "./toast.component";

/** declare component as module for reusing it **/
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ToastComponent],
  declarations: [ToastComponent],
})
export class ToastModule {}
