import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardPageComponent } from './card-page.component';
import { CardPageRoutingModule } from './card-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { CardInputComponent } from './card-input/card-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardInputReadonlyComponent } from './card-input-readonly/card-input-readonly.component';

@NgModule({
  declarations: [
    CardPageComponent,
    CardProfileComponent,
    CardInputComponent,
    CardInputReadonlyComponent,
  ],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    DatePipe,
  ],
})
export class CardPageModule {}
