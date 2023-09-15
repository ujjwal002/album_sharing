import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../../user/service/user-service.service';
@Component({
  selector: 'app-diplay',
  templateUrl: './diplay.component.html',
  styleUrls: ['./diplay.component.css'],
})
export class DiplayComponent implements OnInit {
  id: any;
  data:any;
  owner_id: any;
  album:any;
  owner_name:any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private userService:UserServiceService
  ) {}
  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam;
    console.log(this.id);
    this.userService.getOneImage(this.id).subscribe(Response=>{
      console.log(Response.photo.owner_name);
      this.owner_name =Response.photo.owner_name 

      
      console.log(Response.photo.image);
      console.log();
      this.album = Response.photo.Album
      
      this.data = Response.photo.image
 
    })
    
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  setting(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/setting/${this.owner_id}`])
  }
  gotoShared(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/shared/${this.owner_id}`])
  }
}
