import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FolderDetailsComponent} from './folder-details/folder-details.component';


const routes: Routes = [
  {
    path: ':id',
    component: FolderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
