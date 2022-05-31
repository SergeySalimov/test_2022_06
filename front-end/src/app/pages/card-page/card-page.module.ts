import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPageComponent } from './card-page.component';
import { CardPageRoutingModule } from './card-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { CardInputComponent } from './card-input/card-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CardPageComponent,
    CardProfileComponent,
    CardInputComponent,
  ],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
})
export class CardPageModule {}
