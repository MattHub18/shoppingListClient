import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {ToastModule} from "../../components/toast/toast.module";
import {DatetimePipe} from "../../pipes/datetime/datetime.pipe";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ToastModule
  ],
  declarations: [HomePage, DatetimePipe]
})
export class HomePageModule {}
