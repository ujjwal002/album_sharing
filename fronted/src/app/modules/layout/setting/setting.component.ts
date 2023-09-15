import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgZone } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AddAlbumsComponent } from '../../albums/components/add-albums/add-albums.component';
import { ShareEmailsComponent } from '../share-emails/share-emails.component';
import { DeleteCompoComponent } from '../delete-compo/delete-compo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent implements OnInit {
  public dataa: any;
  name: string = '';

  id: any;
 
  files: File[] = [];
  album_id:any;
  user_id: any;
  owner_id: any;
  search:string='';
  limit:number;
  page:number;
  condition:boolean=false;


  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar


    
  ) {
    this.limit=5;
    this.page=1;
    this.getAll();
  }

  ngOnInit(): void {

    let idParam = this.route.snapshot.paramMap.get('id');
    (this.id = idParam), console.log(this.id);
    
  }
  getAll() {
    this.userService.getOwnerAll(this.page,this.limit,this.search).subscribe((Response) => {
      this.dataa = Response["albums"]
      console.log(this.dataa);
      
    },
    error=>{
      console.log("error",error.error.message); 
      this.toastr.error("No album found")
    }
    );
    
  }


  
 
  // onDelete(id: any) {
  //   alert('Are you sure want to delete?');
  //   this.userService.deleteAlbum(id).subscribe((Response) => {
  //     console.log('data delete succesfully');
  //     this.getAll();
  //   });
  // }
  onEdit(id: any) {
    alert('Are you sure want to Edit?');

    this.router.navigate([`/dashboard/editAlbum/${id}`]);
  }
  
 
  


  
  onInputChange(event: any) {
    
    this.search = event.target.value
    this.getAll()
    
  }
  onPageChange(event: any) {
    this.page = event.pageIndex;
    console.log(event);
    
    console.log("page");
    
    console.log(this.page);
    
    this.getAll();
  }

  onPageSizeChange(event: any) {
    
    console.log("limit");
    
    console.log(this.limit);
    
    this.limit = event.pageSizeOptions;
    this.getAll();
  }
  openDialog(): void {
    const id = this.id;
    
    const dialogRef = this.dialog.open(AddAlbumsComponent, {
      // data: {name: this.name, animal: this.animal},
      height: '378px',
      width: '397px',
      data: { id: id }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      
    });
  }
  toggleVisibility(id:any): void {
    console.log("hii");
    
    this.album_id = id
    
    console.log(id);
    console.log(this.album_id);
    

    console.log("get id");
    
    
    this.user_id = localStorage.getItem('owner_id')


    const dialogRef = this.dialog.open(ShareEmailsComponent, {
      height: '240px',
      width: '800px',
      data: { album_id:this.album_id,
        user_id : parseInt(this.user_id)
      }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      
    });
  }
  onDelete(id:any) {
    const dialogRef = this.dialog.open(DeleteCompoComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }
}
