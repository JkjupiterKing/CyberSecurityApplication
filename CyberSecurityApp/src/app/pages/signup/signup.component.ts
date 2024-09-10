import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})

export class SignupComponent {
  
  regObj:any = {
    "email": "",
    "password": "",
    "confirmpassword": ""
  };
  
  signupForm: FormGroup;
  http = inject(HttpClient);
  
  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Registration successful');
      // this.http.post("http://localhost:8080/register-user", this.regObj).subscribe((res:any)=>{
        this.http.post("http://localhost:8080/register", this.regObj).subscribe((res:any)=>{
        // debugger;
        // debugger;
        console.log(res);
        
        if(res) {
          alert("Register Success");
          localStorage.setItem("angular18Login",this.regObj.email);
          this.router.navigateByUrl("/login");
        } else {
          alert("Failed to register")
        }
      })
      
      this.router.navigate(['/login']);
    }
  }
}