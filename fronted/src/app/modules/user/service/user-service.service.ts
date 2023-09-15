import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  private composeUrl(url: string): string {
    return `${environment.host}/${url}`;
  }

  constructor(private http: HttpClient,private router:Router) { }

  login(formData:any):Observable<any>{
    return this.http.post<any>(this.composeUrl('user/login'),formData)
  }
  signup(formData:any):Observable<any>{
    return this.http.post<any>(this.composeUrl('user/adduser'),formData);
  }
  forgotPassword(formData:any):Observable<any>{
    return this.http.post<any>(this.composeUrl('user/forgotpassword'),formData);
  }
  resetPassword(formData:any):Observable<any>{
    return this.http.post<any>(this.composeUrl('user/resetpassword'),formData);
  }
  
  getAll():Observable<any>{
    return this.http.get<any>(this.composeUrl('user/album/getalbum'))
  }
  getOwnerAll(page:Number,limit:Number,search?:String):Observable<any>{
    console.log("hii");
    
    console.log(!search);
    
    return this.http.get<any>(this.composeUrl(`user/album/showOwnerAlbums?page=${page}&&limit=${limit}&&search=${(search==""||!search)?'':search}`))
  }
  
  deleteAlbum(id:any):Observable<any>{
    return this.http.delete<any>(this.composeUrl(`user/album/deleteAlbum/${id}`))
  }
  getImage(id:string):Observable<any>{
    return this.http.get<any>(this.composeUrl(`user/album/getImage/${id}`))
  }
  getAllPhotoshared(id:string):Observable<any>{
    return this.http.get<any>(this.composeUrl(`user/album/getAllPhotoshared/${id}`))
  }
  
  addImage(id:any,formData:any):Observable<any>{
    return this.http.post<any>(this.composeUrl(`user/album/addImage/${id}`),formData)
  }
  addPhotoShared(id:any,formData:any):Observable<any>{
    return this.http.post<any>(this.composeUrl(`user/album/addPhotoShared/${id}`),formData)
  }
  
  deleteImage(id:any):Observable<any>{
    return this.http.delete<any>(this.composeUrl(`user/album/deleteImage/${id}`))
  }
  getOneImage(id:any):Observable<any>{
    return this.http.get<any>(this.composeUrl(`user/album/getOneImage/${id}`))
  }
  updateImage(id: any, formData: any): Observable<any> {
    return this.http.patch<any>(this.composeUrl(`user/album/updateimage/${id}`), formData);
  }
  shareAlbum(formData: any): Observable<any> {
    return this.http.post<any>(this.composeUrl('user/album/sharealbum'), formData, {headers: this.headers}); 
  }
  sharedwith(id:any):Observable<any>{
    return this.http.get<any>(this.composeUrl(`user/album/getAllshared/${id}`))
  }
  permission(formData:any):Observable<any>{
    return this.http.post<any>(this.composeUrl(`user/album/permission`),formData,{headers: this.headers})
  }
  getPermission():Observable<any>{
    return this.http.get<any>(this.composeUrl(`user/album/getPermission`))
  }
  updatePermission(formdata:any):Observable<any>{
    return this.http.patch<any>(this.composeUrl(`user/album/updatePermission`),formdata,{headers: this.headers})
  }
  deletePermission(id:any):Observable<any>{
    return this.http.delete<any>(this.composeUrl(`user/album/deletePermission/${id}`))
  }

}
