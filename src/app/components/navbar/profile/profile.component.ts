import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private admin: AdminService) { }

  fullName: any = this.admin.user.username;
  email: any = this.admin.user.email;
  role: any = this.admin.user.role;
  cardID: string = this.admin.user.cardID

  ngOnInit(): void { }

  logout() {
    this.admin.logout();
  }
}
