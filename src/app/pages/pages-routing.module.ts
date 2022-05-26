import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouteEnum } from '../shared/constant/route.enum';

const pagesRoutes: Routes = [
  {
    path: '',
    redirectTo: RouteEnum.TODO,
    pathMatch: 'full',
  },
  {
    path: RouteEnum.TODO,
    loadChildren: () => import('./to-do-page/to-do-page.module').then(m => m.ToDoPageModule),
  },
  {
    path: RouteEnum.CARD + '/:cardId',
    loadChildren: () => import('./card-page/card-page.module').then(m => m.CardPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
