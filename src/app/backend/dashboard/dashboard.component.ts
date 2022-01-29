import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private admin: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/d/msg']);
  }
  logout() {
    this.admin.logout();
  }
}
