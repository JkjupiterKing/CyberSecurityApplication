import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sql-injection',
  templateUrl: './sql-injection.component.html',
  styleUrls: ['./sql-injection.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class SqlInjectionComponent {
  vulnEmail: string = '';
  vulnPassword: string = '';
  vulnQueryResult: string = '';
  
  safeEmail: string = '';
  safePassword: string = '';
  safeQueryResult: string = '';

  constructor(private http: HttpClient) {}

  //vulnerable login submit
  onVulnSubmit() {
    const user = { 
        email: this.vulnEmail,  // Standard input for email
        password: this.vulnPassword // Input for password, potentially malicious
    };

    this.http.post('http://localhost:8080/vulnerable-login', user, { responseType: 'text' })
      .subscribe(
        result => {
          this.vulnQueryResult = result; 
        },
        (error: HttpErrorResponse) => {
          this.vulnQueryResult = error.error || 'An unexpected error occurred';
        }
      );
}



 //safe
  onSafeSubmit() {
    const user = { email: this.safeEmail, password: this.safePassword };
    this.http.post('http://localhost:8080/safe-login', user, { responseType: 'text' })
      .subscribe(
        result => {
          this.safeQueryResult = result;
        },
        (error: HttpErrorResponse) => {
          this.safeQueryResult = error.error || 'An unexpected error occurred';
        }
      );
  }
}
