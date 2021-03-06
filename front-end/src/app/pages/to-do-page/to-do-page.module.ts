import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ToDoPageComponent } from './to-do-page.component';
import { ToDoPageRoutingModule } from './to-do-page-routing.module';
import { ToDoInputComponent } from './to-do-input/to-do-input.component';
import {
  ToDoTableBodyComponent,
  ToDoTableComponent,
  ToDoTableFilterComponent,
  ToDoTableHeaderComponent
} from '@app/pages/to-do-page/to-do-table';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToDoPageRoutingModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    ToDoPageComponent,
    ToDoTableComponent,
    ToDoInputComponent,
    ToDoTableHeaderComponent,
    ToDoTableFilterComponent,
    ToDoTableBodyComponent,
  ],
  exports: [
    ToDoPageComponent,
  ],
})
export class ToDoPageModule {
}
