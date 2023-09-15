import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlbumServiceService {
  
  private composeUrl(url: string): string {
    return `${environment.host}/${url}`;
  }
  constructor(private http:HttpClient) { }
  addAlbum(formData: any): Observable<any> {
    return this.http.post<any>(this.composeUrl('user/album/addalbum'), formData);
  }
  getAlbum(id:any):Observable<any>{
    return this.http.get<any>(this.composeUrl(`user/album/getthisalbum/${id}`));
  }
  editAlbum(id:any,formData:any):Observable<any>{
    return this.http.patch<any>(this.composeUrl(`user/album/updatealbum/${id}`), formData);
  }
}
