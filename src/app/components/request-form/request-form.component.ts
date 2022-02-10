import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private service: Service
  ) { }

  requestForm: FormGroup = new FormGroup({});
  data: any = this.adminService.user;
  submitted = false;

  ngOnInit(): void {
    console.log(this.data);
    this.requestForm = this.fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      feedbackLevel: new FormControl(''),
    });
  }
  get f() {
    return this.requestForm.controls;
  }
  sendRequest() {
    const data: any = {
      title: this.f.title.value,
      message: this.f.message.value,
      feedbackLevel: this.f.feedbackLevel.value,
      type: 'request',
    };

    this.service.sendMessage(data).subscribe((res) => {
      console.log(res);
      this.submitted = true;
    });
  }
  newMsg(): void {
    this.submitted = false;
    this.requestForm.reset();
  }
}
