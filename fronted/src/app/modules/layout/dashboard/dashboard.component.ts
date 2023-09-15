import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public owner_id:any;
  constructor(private router:Router){

  }
  ngOnInit(): void {
      
  }
  setting(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/dashboard/setting/${this.owner_id}`])
  }
  gotoShared(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/dashboard/shared/${this.owner_id}`])
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
