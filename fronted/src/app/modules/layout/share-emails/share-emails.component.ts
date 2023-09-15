import { Component, Inject, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserServiceService } from '../../user/service/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-share-emails',
  templateUrl: './share-emails.component.html',
  styleUrls: ['./share-emails.component.css'],
})
export class ShareEmailsComponent implements OnInit {
  public dataa: any;
  name: string = '';
  emailsWithPermission: { email: string; permission: boolean }[] = [];

  id: any;
  emailForm!: FormGroup;
  emails: string[] = [];
  files: File[] = [];
  album_id: any;
  user_id: any;
  owner_id: any;
  condition: boolean = false;
  isVisible: boolean = false;
  additionaldata: any;
  formData: any;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private toastr: ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { album_id: number; user_id: number },
    private dialogRef: MatDialogRef<ShareEmailsComponent>
  ) {
    console.log(data);
    
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      permission: [false],
    });
  }
  // onSubmit(){

  // }

  addEmail() {
    const email = this.emailForm.get('email')?.value;
    const permission = this.emailForm.get('permission')?.value;
    if (this.emailForm.valid && email !== '' && !this.emails.includes(email)) {
      this.emails.push(email);
      // this.emailForm.value.push(email)
      this.emailsWithPermission.push({ email, permission });
      this.emailForm.reset();
    }
  }

  removeEmail(index: number) {
    console.log(this.emails);
    if (index >= 0 && index < this.emailsWithPermission.length) {
      this.emailsWithPermission.splice(index, 1);
      this.emails.splice(index, 1);
    }
  }
  isLoading:boolean= false;

  onSubmit() {
    this.isLoading = true;
    console.log(this.emails);
    this.additionaldata = {
      album_id: this.data.album_id,
      user_id: this.data.user_id,
    };
    this.formData = {
      ...this.emailForm.value,
      ...this.additionaldata,
    };
    this.userService.shareAlbum(this.formData).subscribe((Response) => {
      console.log(Response);
      this.isLoading = false;

      
      this.isVisible = !this.isVisible;
      
      this.emails = [];
      this.dialogRef.close('success'); 
      this.toastr.success('email sent succesfully');
      
    });  }
}
