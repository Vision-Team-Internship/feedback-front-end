import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private admin: AdminService) {}

  userData: any = this.admin.user;
  ngOnInit(): void {}

  logout() {
    this.admin.logout();
  }
}
