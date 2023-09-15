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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  shown(){
    console.log("look--");
    
    this.toastr.error('Incorrect username and password');
    console.log("hii--");
    


  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userservice.login(this.loginForm.value).subscribe((Response) => {
        console.log(Response);

        localStorage.setItem('owner_id', Response.user.id);
        localStorage.setItem('token', Response.token);
        localStorage.setItem('owner_name', Response.user.username);
        console.log(Response.token);

        this.router.navigate([`/dashboard/setting/${Response.user.id}`]);
        this.toastr.success('Login succesfully');
      },
      error=>{
        console.log('status code ->' + error.status);
        this.shown()

      }
      );
    }
  }
}
