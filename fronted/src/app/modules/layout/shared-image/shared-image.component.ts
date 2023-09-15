import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddImageComponent } from '../add-image/add-image.component';

import {
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-shared-image',
  templateUrl: './shared-image.component.html',
  styleUrls: ['./shared-image.component.css']
})
export class SharedImageComponent implements OnInit {
  public id: any;
  public imagePath: any;
  public photo: any;
  public idd: any;
  isSubscribedToEmailsMessage:any=true;

  selectedFiles: FileList | any;
  owner_id: any;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router:Router,
    public dialog: MatDialog,

    
  ) {}
  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam;
    console.log("album_id");
    
    console.log(this.id);

    this.getall();
  }
  getall() {
    this.userService.getAllPhotoshared(this.id).subscribe((Response) => {
      console.log(Response.photo[0]);
      console.log(Response);
      
      this.photo = Response.photo;
      this.idd = Response;
     
      
    });
  }
  isVisible: boolean = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }
  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }
  onSubmit(): void {
    if (this.selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('image', this.selectedFiles[i]);
      }

      this.userService.addPhotoShared(this.id, formData).subscribe((Response) => {
        console.log(Response);
        this.isVisible = false;
        this.getall();
        this.selectedFiles = null;
      });
    }
  }
  onDelete(id: any) {
    console.log(id.id);
    this.userService.deleteImage(id).subscribe((Response) => {
      console.log(Response);
      this.getall();
    });
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  setting(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/setting/${this.owner_id}`])
  }
  onCheckboxChange(id:any,approval:any){

    const data = {
      approval:approval
      
    }
    
    this.userService.updateImage(id,data).subscribe(Response=>{
      console.log(Response);
    })
    
    
  }
  gotoShared(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/shared/${this.owner_id}`])
  }
  openDialog(): void {
    
    
    const dialogRef = this.dialog.open(AddImageComponent, {
      height: '400px',
      width: '600px',
      data: { album_id: this.id,approval:false }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getall()
      console.log('The dialog was closed');
      console.log(result);
      });
  }

}
