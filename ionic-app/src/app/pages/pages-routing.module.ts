import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@core/helpers';
import { NgModule } from '@angular/core';

const pagesRoutes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.TODO(),
    pathMatch: 'full',
  },
  {
    path: AppRoutes.TODO(),
    loadChildren: () => import('./todo-page/todo.module').then(m => m.TodoModule),
  },
  {
    path: AppRoutes.CARD('cardId'),
    loadChildren: () => import('./card-page/card.module').then(m => m.CardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
