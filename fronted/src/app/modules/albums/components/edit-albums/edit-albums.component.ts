import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumServiceService } from '../../service/album-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-albums',
  templateUrl: './edit-albums.component.html',
  styleUrls: ['./edit-albums.component.css']
})
export class EditAlbumsComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  id:any;
  albumDetail:any;

  constructor(private fb: FormBuilder,private albumService:AlbumServiceService,private router:Router,    private route: ActivatedRoute,
    ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam
    this.albumService.getAlbum(this.id).subscribe(Response=>{
      console.log(Response);
      this.albumDetail = Response.ThisAlbum;
      console.log(this.albumDetail.title); 
      this.form.controls["title"].setValue(this.albumDetail.title)
      this.form.controls["status"].setValue(this.albumDetail.status)
    })
    
    

      
  }
  onSubmit(){
    this.albumService.editAlbum(this.id,this.form.value).subscribe(respose=>{
      this.router.navigate(['/home'])
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
