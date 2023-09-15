import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  data:any;
  dataa: any;
  dataaa: any;
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    
  }
  owner_id: any;
  ngOnInit(): void {
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
    this.userService.getPermission().subscribe(Response=>{
      console.log(Response.response); 
      this.data =Response.response 
    })
  }
  grant(id:any,fid:any){
    console.log(id);
    
    this.dataa={
      id:id,
      permission:true,
    }
    this.userService.updatePermission(this.dataa).subscribe(Response=>{
      console.log(Response);
      this.deletePer(fid)
  
    })

  }
  deletePer(id:any){
    console.log(id);
    this.dataaa={
      id:id,
    }
    this.userService.deletePermission(id).subscribe(Response=>{
      console.log(Response);
      this.getAll();
      
    })
    
  }
  gotoShared(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/shared/${this.owner_id}`])
  }

}
