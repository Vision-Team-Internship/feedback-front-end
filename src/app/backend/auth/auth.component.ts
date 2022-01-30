import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private auth: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  login() {
    this.auth.login(this.f.email.value, this.f.password.value).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        if (data.role == 'admin') {
          this.router.navigate(['/d']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (err) => {
        alert(err);
      }
    );
  }
}
