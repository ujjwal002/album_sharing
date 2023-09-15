import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from '../../user/service/user-service.service';

@Component({
  selector: 'app-crousel',
  templateUrl: './crousel.component.html',
  styleUrls: ['./crousel.component.css']
})
export class CrouselComponent implements OnInit {
  public length:any;
  public image_data:any;
  public count:any;

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4}
  slides:any;
  ngOnInit(): void {
    // this.slides=new Array(this.count).fill({id: -1, src: '', title: '', subtitle: ''});
    
    
    this.userService.getImage(this.data.data.id).subscribe(Response=>{
      console.log(Response.photo);
      this.slides = Response.photo
    })
    
      
  }
  constructor(
    private userService:UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ){
    console.log(data);
    
  }
  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
  
  

}
