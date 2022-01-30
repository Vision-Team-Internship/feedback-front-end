import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { User } from 'src/model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  createUserForm!: FormGroup;
  displayCreateUser = false;

  constructor(private userService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((data: any) => {
      console.log(data.payload);
      this.users = data.payload;
    });
    this.createUserForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      avatar: [''],
      phone: [''],
      role: [''],
      cardID: [''],
      gender: [''],
    });
  }
  get f() {
    return this.createUserForm.controls;
  }
  toggleDisplyUser() {
    this.displayCreateUser = !this.displayCreateUser;
  }

  createUser() {
    const data: any = {
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
      avatar: '',
      phone: this.f.phone.value,
      role: 'normal',
      cardID: 'B004',
      gender: 'male',
    };
    console.log('user', data);
    this.userService.createUSer(data).subscribe((res) => {
      console.log('user', data);
      console.log('response', res);
      this.users.push(res.payload);
    });
    this.createUserForm.reset();
  }
}
