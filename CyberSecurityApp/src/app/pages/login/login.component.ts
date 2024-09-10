import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: any = {
    email: "",
    password: ""
  };

  http = inject(HttpClient);

  constructor(private router: Router) {}

  onLogin() {
    console.log("Inside Login");

    this.http.post("http://localhost:8080/login", this.loginObj, { responseType: 'text' })
      .subscribe({
        next: (res: string) => {
          console.log("API Response:", res);

          if (res === "Login Success") {
            alert("Login Success");
            localStorage.setItem("angular18Login", this.loginObj.email);
            this.router.navigateByUrl("dashboard");
          } else {
            alert("Check Username or Password");
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error("API Error:", err.message);
          alert("An error occurred while logging in.");
        }
      });
  }
}
