import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent implements OnInit {
  public id:any;
  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam;
    console.log(this.id);
    console.log(this.data);
    
    
  }
  title = 'dropzone';

  files: File[] = [];

  constructor(
    private http: HttpClient,
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddImageComponent>
  ) {}

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();
    console.log("hii");
    

    console.log(this.data);
    

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }

   
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  uploadImages() {
    const formData = new FormData();
    console.log(this.data);
    

   

    for (const file of this.files) {
      formData.append('image', file);
      console.log(formData.get('image'));
      
    }
    if(this.data.approval==false){
      this.userService.addPhotoShared(this.data.album_id, formData).subscribe((Response) => {      
      this.dialogRef.close('success'); 
      // this.router.navigate([`dashboard/imageSetting/${this.data.album_id}`]);
      this.toastr.success('Photo uploaded succesfully');
    }
    );
    }
    else{
      this.userService.addImage(this.data.id, formData).subscribe((Response) => {      
        this.dialogRef.close('success'); 
        this.router.navigate([`dashboard/imageSetting/${this.data.album_id}`]);
        this.toastr.success('Photo uploaded succesfully');
      }
      );
      
    }
  }
}
