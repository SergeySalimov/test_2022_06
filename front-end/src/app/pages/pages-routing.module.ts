import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutes } from '@core/services';
import { PageWrapperComponent } from '@app/pages/page-wrapper/page-wrapper.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PageWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.TODO(),
        pathMatch: 'full',
      },
      {
        path: AppRoutes.TODO(),
        loadChildren: () => import('./to-do-page/to-do-page.module').then(m => m.ToDoPageModule),
      },
      {
        path: AppRoutes.CARD('cardId'),
        loadChildren: () => import('./card-page/card-page.module').then(m => m.CardPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
