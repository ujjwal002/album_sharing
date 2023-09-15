import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './home/home.component';
import { ImagesComponent } from './images/images.component';
import { NgxFileDropModule } from 'ngx-file-drop';

import { FormsModule } from '@angular/forms';
import { SettingComponent } from './setting/setting.component';
import { UserImageComponent } from './user-image/user-image.component';
import { DiplayComponent } from './diplay/diplay.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { SharedAlbumComponent } from './shared-album/shared-album.component';
import { PermissionComponent } from './permission/permission.component';
import { PermissionGrantedComponent } from './permission-granted/permission-granted.component';
import { SharedImageComponent } from './shared-image/shared-image.component';
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddImageComponent } from './add-image/add-image.component';
import { ShareEmailsComponent } from './share-emails/share-emails.component';

import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CropImageComponent } from './crop-image/crop-image.component';
import { CrouselComponent } from './crousel/crousel.component';
import { DeleteCompoComponent } from './delete-compo/delete-compo.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HomeComponent,
    ImagesComponent,
    SettingComponent,
    UserImageComponent,
    DiplayComponent,
    SharedAlbumComponent,
    PermissionComponent,
    PermissionGrantedComponent,
    SharedImageComponent,
    DashboardComponent,
    AddImageComponent,
    ShareEmailsComponent,
    CropImageComponent,
    CrouselComponent,
    DeleteCompoComponent,
  
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxFileDropModule,
    NgxDropzoneModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    ImageCropperModule,
    NgxPaginationModule,
    NgbModule,
    SlickCarouselModule    // CarouselModule.forRoot(),
    
  ]
})
export class LayoutModule { }
