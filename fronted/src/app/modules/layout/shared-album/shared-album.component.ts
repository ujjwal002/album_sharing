import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-shared-album',
  templateUrl: './shared-album.component.html',
  styleUrls: ['./shared-album.component.css']
})
export class SharedAlbumComponent implements OnInit {
  id: any;
  album:any;
  user:any;
  owner_id: any;
  permit:any = "Take permission";
  data:any;
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam
    console.log(this.id);
    
    this.getAll();
    
    
  }
  setting(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/setting/${this.owner_id}`])
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getAll(){
    this.userService.sharedwith(this.id).subscribe(Response=>{
      console.log(Response);
      
      console.log(Response.respose[0].Album.title);
      this.album = Response.respose;
    })
  }
  permission(items:any){
    console.log("----");
    console.log(items);
    localStorage.setItem("shared_id",items.id)
    
    
    console.log(items.User.album_id);
    
   
    this.data={
      album_id:items.album_id,
      user_id:items.user_id,
      shared_id:items.id,
    }
    this.userService.permission(this.data).subscribe(Response=>{
      console.log(Response);
      this.permit = "pending"
      
    })
    
    

  }
  gotoShared(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/shared/${this.owner_id}`])
  }

}
