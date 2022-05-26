import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPageComponent } from './card-page.component';
import { CardPageRoutingModule } from './card-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardProfileComponent } from './card-profile/card-profile.component';

@NgModule({
  declarations: [
    CardPageComponent,
    CardProfileComponent,
  ],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    SharedModule,
  ],
})
export class CardPageModule {}
