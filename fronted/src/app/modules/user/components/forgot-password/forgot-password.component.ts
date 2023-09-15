import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  loginForm!: FormGroup;
  public isDynamic: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserServiceService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {}
  shown(){
    console.log("look--");
    
    this.toastr.error('Invalid Email');
    console.log("hii--");
    


  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userservice.forgotPassword(this.loginForm.value).subscribe((Response) => {
        // this.router.navigate(['/dash/home']);
        this.loginForm.reset();
        this.toastr.success('Email sent to reset password');
      },
      error=>{
        console.log('status code ->' + error.status);
        this.shown()

      }
      );
    }
  }

}
