import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {InputErrorMessageComponent} from "./input-error-message.component";

/** declare component as module for reusing it **/
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [InputErrorMessageComponent],
  declarations: [InputErrorMessageComponent],
})
export class InputErrorMessageModule {}
