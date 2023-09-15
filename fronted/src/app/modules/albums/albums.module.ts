import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlbumsRoutingModule } from './albums-routing.module';
import { ShowAlbumsComponent } from './components/show-albums/show-albums.component';
import { EditAlbumsComponent } from './components/edit-albums/edit-albums.component';
import { AddAlbumsComponent } from './components/add-albums/add-albums.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';


@NgModule({
  declarations: [
    ShowAlbumsComponent,
    EditAlbumsComponent,
    AddAlbumsComponent,
    AlbumDetailsComponent
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AlbumsModule { }
