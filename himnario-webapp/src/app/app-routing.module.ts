import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HymnComponent } from './components/hymn/hymn.component';
import { HymnsindexComponent } from './components/hymnsindex/hymnsindex.component';

const routes: Routes = [
  {
    path: 'index',
    component: HymnsindexComponent
  },
  {
    path: 'index/:search',
    component: HymnsindexComponent
  },
  {
    path: 'hymn/:number',
    component: HymnComponent
  },
  { 
    path: 'index', 
    redirectTo: 'index/:search'
  },
  { 
    path: '**', 
    redirectTo: 'index', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
