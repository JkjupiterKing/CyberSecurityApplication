import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}
  
  sqlinjection() {
    this.router.navigate(['/sql-injection']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  audioEd() {
    console.log("Navigating to /audio-ed");
    this.router.navigate(['/audio-ed']);
  } 
}