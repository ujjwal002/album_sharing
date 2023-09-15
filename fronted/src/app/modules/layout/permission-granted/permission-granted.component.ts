import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgZone } from '@angular/core';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddAlbumsComponent } from '../../albums/components/add-albums/add-albums.component';
import { ShareEmailsComponent } from '../share-emails/share-emails.component';
import { CrouselComponent } from '../crousel/crousel.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteCompoComponent } from '../delete-compo/delete-compo.component';

@Component({
  selector: 'app-permission-granted',
  templateUrl: './permission-granted.component.html',
  styleUrls: ['./permission-granted.component.css'],
})
export class PermissionGrantedComponent implements OnInit {
  public dataa: any;
  name: string = '';

  id: any;
  album_id: any;
  user_id: any;
  owner_id: any;
  search: string = '';
  // limit: number;
  page: number;
  caraosol_id: any;
  // public length:any
  public length_page:any;

  @Input() length: any; 
  @Input() limit: any;
  @Input() currentPage: any=1;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.limit = 8;
    this.page = 1;
  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.userService.getOwnerAll(this.page, this.limit, this.search).subscribe(
      (Response) => {
        console.log(Response);
        
        this.dataa = Response['albums'];
        this.length = Response['count'];
        this.page = Math.ceil(this.length/this.limit);
        this.length_page= Array.from({ length: this.page }, (_, index) => index + 1); 
      },
      (error) => {
        console.log('error', error.error.message);
        this.dataa=[]
        this.toastr.error('No album found');
      }
    );
  }

  onEdit(id: any) {
    // alert('Are you sure want to Edit?');

    this.router.navigate([`/dashboard/editAlbum/${id}`]);
  }
  onImage(id: any) {
    this.router.navigate([`/dashboard/imageSetting/${id}`]);
  }

  onInputChange(event: any) {
   this.page=1;
   this.limit=8
    console.log(this.limit);
    this.search = event.target.value;
    console.log(this.search);
    this.getAll();
  }

  openDialog(): void {
    const id = this.id;

    const dialogRef = this.dialog.open(AddAlbumsComponent, {
      height: '378px',
      width: '397px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  toggleVisibility(id: any): void {
    console.log('hii');

    this.album_id = id;

    console.log(id);
    console.log(this.album_id);

    console.log('get id');

    this.user_id = localStorage.getItem('owner_id');

    const dialogRef = this.dialog.open(ShareEmailsComponent, {
      height: '240px',
      width: '800px',
      data: { album_id: this.album_id, user_id: parseInt(this.user_id) },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  carousel(id: any): void {
    const dialogRef = this.dialog.open(CrouselComponent, {
      height: '500px',
      width: '800px',
      data: {
        data: { id: id },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  onDelete(id: any) {
    this.page=1;
    this.limit = 8
    const dialogRef = this.dialog.open(DeleteCompoComponent, {
      // height: '100px',
      // width: '500px',
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('hii');
        this.userService.deleteAlbum(id).subscribe((Response) => {
          console.log('data delete succesfully');
          this.getAll();
        });

        this.snackBar.open('Album deleted succesfully', '', {
          duration: 2000,
        });
      }
    });
  }
 
  pagination_fun(id:any){
    console.log("page");
    this.currentPage = id
    console.log(id);
    this.page = id;
    this.getAll()
  }
}
