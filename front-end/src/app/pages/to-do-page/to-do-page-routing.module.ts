import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ToDoPageComponent } from './to-do-page.component';
import { StatusEnumResolver, ToDoResolver } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: ToDoPageComponent,
    resolve:
      {
        statusEnum: StatusEnumResolver,
        todos: ToDoResolver,
      },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoPageRoutingModule {}
