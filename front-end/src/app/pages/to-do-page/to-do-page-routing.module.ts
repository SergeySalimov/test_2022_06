import { RouterModule, Routes } from '@angular/router';
import { ToDoPageComponent } from './to-do-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: ToDoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoPageRoutingModule {}
