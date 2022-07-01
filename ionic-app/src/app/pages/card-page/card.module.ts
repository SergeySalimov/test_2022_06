import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardRoutingModule } from './card-routing.module';
import { CardPage } from './card.page';

@NgModule({
  declarations: [
    CardPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CardRoutingModule,
  ],
  exports: [
    CardPage,
  ],
})
export class CardModule { }
