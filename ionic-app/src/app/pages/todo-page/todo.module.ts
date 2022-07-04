import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPage } from './todo.page';
import { TodoRoutingModule } from './todo-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoPage,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [
    TodoPage,
  ],
})
export class TodoModule {}
