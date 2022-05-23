import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToDoPageComponent} from "./to-do-page.component";
import {ToDoService} from "../service/to-do.service";
import {ToDoTableComponent} from './to-do-table/to-do-table.component';
import {ToDoInputComponent} from './to-do-input/to-do-input.component';

@NgModule({
  declarations: [
    ToDoPageComponent,
    ToDoTableComponent,
    ToDoInputComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ToDoPageComponent
  ],
  providers: [
    ToDoService,
  ],
})
export class ToDoPageModule {
}
