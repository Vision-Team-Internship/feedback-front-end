import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { User } from 'src/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private admin: AdminService) { }
  userID!: string;
  user!: User;
  userData: any = this.admin.user;

  ngOnInit(): void {
    this.userID = this.admin.user._id
    this.loadUserDetail(this.userID);
  }

  loadUserDetail(id: string) {
    this.admin.getUserDetail(id).subscribe((user: any) => {
      this.user = user.payload;
    })
  }

  logout() {
    this.admin.logout();
  }
}
