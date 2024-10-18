import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RegisterPageRoutingModule} from './register-routing.module';

import {RegisterPage} from './register.page';
import {InputErrorMessageModule} from "../../components/input-error-message/input-error-message.module";
import {ToastModule} from "../../components/toast/toast.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    InputErrorMessageModule,
    ReactiveFormsModule,
    ToastModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {
}
