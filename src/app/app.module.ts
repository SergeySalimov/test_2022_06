import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoPageModule } from './to-do-page/to-do-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToDoPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
