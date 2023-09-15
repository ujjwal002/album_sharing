import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumServiceService } from '../../service/album-service.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/modules/user/service/user-service.service';
@Component({
  selector: 'app-add-albums',
  templateUrl: './add-albums.component.html',
  styleUrls: ['./add-albums.component.css'],
})
export class AddAlbumsComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private albumService: AlbumServiceService,
    private router: Router,
    private dialogRef: MatDialogRef<AddAlbumsComponent>,
    private toastr: ToastrService,
    private userService:UserServiceService

  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  ngOnInit(
  ): void {

  }
  getall(){
    this.userService.getAll().subscribe(respose=>{
      this.toastr.success('Album Added succesfully');

    })
  }
  onSubmit() {
    const user_id = localStorage.getItem('owner_id')
    this.albumService.addAlbum(this.form.value).subscribe((respose) => {
      this.dialogRef.close('success'); 
      this.router.navigate([`/dashboard/setting/${user_id}`]); 
      this.getall();

    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
