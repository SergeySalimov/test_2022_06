import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TruncateDirective} from "./directive/truncate.directive";

@NgModule({
  declarations: [
    TruncateDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TruncateDirective,
  ],
})
export class SharedModule { }
