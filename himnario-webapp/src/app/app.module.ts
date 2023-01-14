import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HymnsindexComponent } from './components/hymnsindex/hymnsindex.component';
import { HymnComponent } from './components/hymn/hymn.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HymnsindexComponent,
    HymnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB5Dvn3J8fNee9I3dOzZyskp2rFrP2OAtY",
      authDomain: "himnario-webapp.firebaseapp.com",
      projectId: "himnario-webapp",
      storageBucket: "himnario-webapp.appspot.com",
      messagingSenderId: "793689209222",
      appId: "1:793689209222:web:47f2a86cf371d88507d407"
    }),
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
