import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from './loader.component';

/** declare component as module for reusing it **/
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [LoaderComponent],
  declarations: [LoaderComponent],
})
export class LoaderModule {}
