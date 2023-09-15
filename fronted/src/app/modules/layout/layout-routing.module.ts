import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImagesComponent } from './images/images.component';
import { SettingComponent } from './setting/setting.component';
import { UserImageComponent } from './user-image/user-image.component';
import { DiplayComponent } from './diplay/diplay.component';
import { SharedAlbumComponent } from './shared-album/shared-album.component';
import { PermissionComponent } from './permission/permission.component';
import { SharedImageComponent } from './shared-image/shared-image.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddImageComponent } from './add-image/add-image.component';
import { CropImageComponent } from './crop-image/crop-image.component';
import { PermissionGrantedComponent } from './permission-granted/permission-granted.component';
import { CrouselComponent } from './crousel/crousel.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'permisson',
        component: PermissionComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'setting/:id',
        component: PermissionGrantedComponent,
      },
      {
        path: 'shared/:id',
        component: SharedAlbumComponent,
      },
      {
        path: 'imageSetting/:id',
        component: UserImageComponent,
      },
      {
        path: 'sharedImage/:id',
        component: SharedImageComponent,
      },
      {
        path: 'image/:id',
        component: ImagesComponent,
      },
      
      {
        path: 'displayImage/:id',
        component: DiplayComponent,
      },
      {
        path:'addImage/:id',
        component:AddImageComponent
      },
      {
        path:'crop/:id',
        component:CropImageComponent
      },
      {
        path:'showAllImage',
        component:CrouselComponent
      }
    ],
  },
  {
    path:'permission/:id',
    component:PermissionGrantedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
