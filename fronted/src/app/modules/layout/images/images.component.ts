import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  public id: any;
  public imagePath: any;
  public photo: any;
  public idd: any;
  public owner_name:any;
  public album:any;

  selectedFiles: FileList | any;
  owner_id: any;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router:Router
  ) {}
  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam;
    console.log(this.id);

    this.getall();
  }
  getall() {
    this.userService.getImage(this.id).subscribe((Response) => {
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
      this.owner_name = localStorage.getItem('owner_name')
      
      

      this.userService.addImage(this.id, formData).subscribe((Response) => {
        console.log(Response);
        this.isVisible = false;
        this.getall();
        this.selectedFiles = null;
      });
    }
  }
  onDelete(id: any) {
    console.log(id.id);
    this.userService.deleteImage(id.id).subscribe((Response) => {
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
  gotoShared(){
    this.owner_id= localStorage.getItem('owner_id')
    this.router.navigate([`/shared/${this.owner_id}`])
  }
}
