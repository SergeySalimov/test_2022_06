import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TRANSLATE_MODULE_CONFIG } from '@app/configs';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
  ],
  declarations: [PageWrapperComponent],
  exports: [PageWrapperComponent],
})
export class PagesModule {}
