import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/layout/home/home.component';
import { LoginComponent } from './modules/user/components/login/login.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    loadChildren:()=>import('./modules/layout/layout.module').then(m=>m.LayoutModule),
    canActivate:[authGuard]
   
  },
  {
    path:"",
    loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule)
  },
  {
    path:'',
    loadChildren:()=>import('./modules/albums/albums.module').then(m=>m.AlbumsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
