import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  public data: any;
  name: string = '';
  owner_id:any='';

  constructor(private userService: UserServiceService,private router:Router) {
    this.getAll()
  }

  ngOnInit(): void {

    
    this.getAll()
   
    
  }
  getAll(){
    this.userService.getAll().subscribe(Response => {
      console.log(Response.albums);
      this.data = Response.albums;   
    });
  }

  
  
  onInputChange(event: any) {
    // this.page=1;
    // this.limit=8
    //  console.log(this.limit);
    //  this.search = event.target.value;
    //  console.log(this.search);
    //  this.getAll();
   }
}
