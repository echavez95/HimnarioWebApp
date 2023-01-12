import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HymnsindexComponent } from './components/hymnsindex/hymnsindex.component';
import { HymnComponent } from './components/hymn/hymn.component';

@NgModule({
  declarations: [
    AppComponent,
    HymnsindexComponent,
    HymnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
