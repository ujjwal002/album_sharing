import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from '../../user/service/user-service.service';


@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent {
  

  addForm!: NgForm;

  flag : boolean = false;

  selectedImage: string | undefined;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any ;
  imageName: any;

  fileList: any = []

  submitted: boolean = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService:UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CropImageComponent>


  ) {}

 

  OnSubmit(event: any) {
    event.preventDefault();
 
    const formData = new FormData();
    // const file = new File([this.finalImage], this.imageName)
    formData.append('image', this.finalImage);

    // formData.append("image", file)
    console.log("cropped image");
    
    console.log(formData.get("image"));
    
  }



  onImageChange(event: any): void {
    const fileList : FileList = event.target.files;
    console.log(fileList)
    if (fileList && fileList.length > 0) {
      const file : File = fileList[0];
      this.selectedImage = file.name;
    }
  }

  fileChangeEvent(event: any): void {
    const fileExtension = event.target.files[0].name.split('.').pop().toLowerCase()
    if(fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
      this.fileList = event.target.files;
    } else {
      this.fileList = [];
    }
    this.imageName = event.target.files[0].name
    this.imageChangedEvent = event;
  }
  
  imageCropped(event: ImageCroppedEvent) {
    console.log(event)
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || "");
      // event.blob can be used to upload the cropped image
      this.finalImage = event.blob;
      console.log("cropped image");
      
      console.log(this.finalImage);
      console.log(this.data);
      
      
  }

  onImage(){
    const formData = new FormData();
    // console.log(this.flag);
    const file = new File([this.finalImage], this.imageName)
    formData.append("image", file)
    console.log(formData.get("file"));
    
    this.userService.addImage(this.data.id, formData).subscribe((Response) => {      
      this.dialogRef.close('success'); 
      this.router.navigate([`dashboard/imageSetting/${this.data.id}`]);
      // this.toastr.success('Photo uploaded succesfully');
    });

  }
  
}
