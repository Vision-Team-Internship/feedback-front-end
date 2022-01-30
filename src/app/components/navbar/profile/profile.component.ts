import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: any = localStorage.getItem('username');
  email: any = localStorage.getItem('email');
  role: any = localStorage.getItem('role');
  phone: any = localStorage.getItem('phone');
  cardID: any = localStorage.getItem('cardID');
  constructor() {}

  ngOnInit(): void {}
}
