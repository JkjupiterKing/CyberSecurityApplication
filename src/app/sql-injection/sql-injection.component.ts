// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-sql-injection',
//   templateUrl: './sql-injection.component.html',
//   styleUrls: ['./sql-injection.component.css'],
//   standalone: true,
//   imports: [FormsModule]
// })
// export class SqlInjectionComponent {
//   usersDatabase = [
//     { email: 'admin@example.com', password: 'admin123' },
//     { email: 'user@example.com', password: 'user123' },
//     { email: 'a@b.com', password: 'abc'}
//   ];

 
//   vulnEmail: string = '';
//   vulnPassword: string = '';
//   vulnResult: string = '';
//   safeEmail: string = '';
//   safePassword: string = '';
//   safeResult: string = '';

//   // Vulnerable SQL query method
//   vulnerableQuery(email: string, password: string): string {
//     // Construct a SQL query string that is vulnerable
//     const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
//     const result = this.executeVulnerableQuery(query);
//     if (result) {
//       return `Welcome ${email}!`; // Simulated successful login
//     }
//     return 'User not found';
//   }

//   // Simulated execution of the vulnerable query
//   private executeVulnerableQuery(query: string): boolean {
//     // Simulate potential SQL injection
//     if (query.includes("OR'1'='1'") || query.includes("';")) {
//       return true; 
//     }

//     // Extract email and password from the query
//     const emailMatch = query.match(/email\s*=\s*'([^']+)'/);
//     const passwordMatch = query.match(/password\s*=\s*'([^']+)'/);
    
//     if (emailMatch && passwordMatch) {
//       const email = emailMatch[1];
//       const password = passwordMatch[1];

//       // Check against the mock database
//       const user = this.usersDatabase.find(user => 
//         user.email === email && user.password === password
//       );
//       return !!user; // Return true if user is found
//     }

//     return false;
//   }

//   // Safe SQL query method
//   safeQuery(email: string, password: string): string {
//     const result = this.usersDatabase.find(user => user.email === email && user.password === password);
//     return result ? `Welcome ${result.email}!` : 'User not found';
//   }

//   // submit button (vulnerable)
//   onVulnSubmit() {
//     this.vulnResult = this.vulnerableQuery(this.vulnEmail, this.vulnPassword);
//   }

//   // submit button (safe)
//   onSafeSubmit() {
//     this.safeResult = this.safeQuery(this.safeEmail, this.safePassword);
//   }
// }

//sql-injection.component.ts:
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-sql-injection',
//   templateUrl: './sql-injection.component.html',
//   styleUrls: ['./sql-injection.component.css'],
//   standalone: true,
//   imports: [FormsModule]
// })
// export class SqlInjectionComponent {
//   vulnEmail: string = '';
//   vulnPassword: string = '';
//   vulnSqlQuery: string = '';
//   vulnQueryResult: string = '';
//   safeEmail: string = '';
//   safePassword: string = '';
//   safeSqlQuery: string = '';
//   safeQueryResult: string = '';

//   // Mocked result for demonstration purposes
//   usersDatabase = [
//     { email: 'admin@example.com', password: 'admin123' },
//     { email: 'user@example.com', password: 'user123' },
//     { email: 'a@b.com', password: 'abc' }
//   ];

//   // Demonstrate vulnerable SQL query construction
//   vulnerableQuery(email: string, password: string): string {
//     // This is how a vulnerable SQL query looks
//     const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
//     this.vulnSqlQuery = query; // Display the query to the user
  
//     // Always check the password for SQL injection attempts, not the email
//     if (password.includes("'") || (password.toLowerCase().includes("or") && password.toLowerCase().includes("1=1"))) {
//       return "SQL Injection detected! Query is vulnerable.";
//     }
  
//     // Simulate login check for email and password
//     const result = this.executeRawQuery(query);
  
//     // If no matching user is found, return "Invalid credentials" regardless of the SQL injection
//     return result ? `Login successful as ${email}` : "Login failed. Invalid credentials.";
//   }
  
  
//   // Simulated execution of a raw query
//   private executeRawQuery(query: string): boolean {
//     const emailMatch = query.match(/email\s*=\s*'([^']+)'/);
//     const passwordMatch = query.match(/password\s*=\s*'([^']+)'/);

//     if (emailMatch && passwordMatch) {
//       const email = emailMatch[1];
//       const password = passwordMatch[1];

//       // Simulate a login based on the mock database
//       const user = this.usersDatabase.find(user => 
//         user.email === email && user.password === password
//       );
//       return !!user; // Return true if user is found
//     }
//     return false;
//   }

//   // Demonstrate safe SQL query using parameterized queries
//   safeQuery(email: string, password: string): string {
//     // This is how a safe, parameterized query looks
//     const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
//     this.safeSqlQuery = query; // Show safe query with placeholders

//     // In the backend, we would pass 'email' and 'password' as parameters to prevent SQL injection
//     const result = this.usersDatabase.find(user => user.email === email && user.password === password);
//     return result ? `Login successful as ${email}` : "Login failed.";
//   }

//   // Handle vulnerable submit
//   onVulnSubmit() {
//     this.vulnQueryResult = this.vulnerableQuery(this.vulnEmail, this.vulnPassword);
//   }

//   // Handle safe submit
//   onSafeSubmit() {
//     this.safeQueryResult = this.safeQuery(this.safeEmail, this.safePassword);
//   }
// }


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
