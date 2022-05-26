import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoPageComponent } from './to-do-page.component';
import { ToDoTableComponent } from './to-do-table/to-do-table.component';
import { ToDoInputComponent } from './to-do-input/to-do-input.component';
import { SharedModule } from '../../shared/shared.module';
import { ToDoPageRoutingModule } from './to-do-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ToDoPageRoutingModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    ToDoPageComponent,
    ToDoTableComponent,
    ToDoInputComponent,
  ],
  exports: [
    ToDoPageComponent,
  ],
})
export class ToDoPageModule {
}
