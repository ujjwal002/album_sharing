import { Component, OnInit,Inject  } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddImageComponent } from '../add-image/add-image.component';
import { CropImageComponent } from '../crop-image/crop-image.component';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css'],
})
export class UserImageComponent implements OnInit {
  public id: any;
  public imagePath: any;
  public photo: any;
  public idd: any;
  isSubscribedToEmailsMessage: any = true;

  selectedFiles: FileList | any;
  owner_id: any;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    
  ) {}

  openDialog(): void {
    const id = this.id;
    const dialogRef = this.dialog.open(AddImageComponent, {
      height: '400px',
      width: '600px',
      data: { id: this.id }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getall()
      console.log('The dialog was closed');
      console.log(result);
      });
  }
  openCropped(): void {
    const id = this.id;
    const dialogRef = this.dialog.open(CropImageComponent, {
      height: '700px',
      width: '800px',
      data: { id: id }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getall()
      console.log('The dialog was closed');
      console.log(result);
      });
  }
  cropImage(id:any): void {
    const dialogRef = this.dialog.open(CropImageComponent, {
      // data: {name: this.name, animal: this.animal},
      height: '900px',
      width: '1200px',
      data: { id: id }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getall()
      console.log('The dialog was closed');
      console.log(result);
      
      // this.animal = result;
    });
  }

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam;
    console.log("album_id");
    
    console.log(this.id);

    this.getall();
  }
  getall() {
    this.userService.getImage(this.id).subscribe((Response) => {
      console.log(Response.photo[0]);
      this.photo = Response.photo;
      this.idd = Response;
      console.log('------');

      console.log(Response.photo[0]);
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
    this.userService.deleteImage(id).subscribe((Response) => {
      console.log(Response);
      this.getall();
    });
  }
  onCrop(id:any){
    this.router.navigate([`/dashboard/crop/${id}`])
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  setting() {
    this.owner_id = localStorage.getItem('owner_id');
    this.router.navigate([`/setting/${this.owner_id}`]);
  }
  onCheckboxChange(id: any, approval: any) {
    const data = {
      approval: approval,
    };

    this.userService.updateImage(id, data).subscribe((Response) => {
      console.log(Response);
    });
  }
  gotoShared() {
    this.owner_id = localStorage.getItem('owner_id');
    this.router.navigate([`/shared/${this.owner_id}`]);
  }
}
