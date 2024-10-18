import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {ToastModule} from "../../components/toast/toast.module";
import {InputErrorMessageModule} from "../../components/input-error-message/input-error-message.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    InputErrorMessageModule,
    ToastModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
