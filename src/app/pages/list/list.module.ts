import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import {InputErrorMessageModule} from "../../components/input-error-message/input-error-message.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPageRoutingModule,
        InputErrorMessageModule,
        ReactiveFormsModule
    ],
  declarations: [ListPage]
})
export class ListPageModule {}
