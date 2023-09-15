import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupForm! : FormGroup
  public isDynamic: boolean = false;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router,private userService:UserServiceService,    private toastr: ToastrService
    ){
    this.signupForm = this.formBuilder.group({
      username:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
      
  }
  onSubmit(){
    if(this.signupForm.valid){
      this.userService.signup(this.signupForm.value).subscribe(response=>{
        console.log(response);
        this.router.navigate(['/login'])
        this.toastr.success('User added  succesfully');  
      },
      err=>{
        this.toastr.error('Please try again');

      }
      )
    }

  }
  
}
