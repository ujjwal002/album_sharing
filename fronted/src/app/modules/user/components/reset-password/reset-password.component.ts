import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  loginForm!: FormGroup;
  public isDynamic: boolean = false;
  submitted: boolean = false;
  public token:any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserServiceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,

  ) {
    this.loginForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      token: [''] 
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
  
      const token = params['token'];

      this.loginForm.get('token')?.setValue(token);
    });
  }
  
  shown(){
    console.log("look--");
    
    this.toastr.error('Password did not match');
    console.log("hii--");
    


  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      
      this.userservice.resetPassword(this.loginForm.value).subscribe((Response) => {
        console.log(Response);


        this.router.navigate(['/login']);
        this.toastr.success('Password reset succesfully');
      },
      error=>{
        console.log('status code ->' + error.status);
        this.shown()

      }
      );
    }
  }

}
