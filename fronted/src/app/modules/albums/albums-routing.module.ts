import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlbumsComponent } from './components/add-albums/add-albums.component';
import { EditAlbumsComponent } from './components/edit-albums/edit-albums.component';
import { DashboardComponent } from '../layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path:'addAlbum',
        component:AddAlbumsComponent
       },
       {
        path:'editAlbum/:id',
        component:EditAlbumsComponent
       }
      
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
