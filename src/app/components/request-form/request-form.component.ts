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
  ) {}

  requestForm: FormGroup = new FormGroup({});
  data: any = this.adminService.user;
  submitted = false;
  imageSrc: any = '';
  file: any = '';
  fileName: any = '';

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      feedbackLevel: new FormControl(''),
      url: new FormControl(''),
    });
  }
  get f() {
    return this.requestForm.controls;
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.file = file;
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  sendRequest() {
    const formData = new FormData();

    formData.append('url', this.file);
    formData.append('title', this.requestForm.controls['title'].value);
    formData.append('message', this.requestForm.controls['message'].value);
    formData.append(
      'feedbackLevel',
      this.requestForm.controls['feedbackLevel'].value
    );
    formData.append('type', 'request');

    this.service.sendMessage(formData).subscribe((res) => {
      console.log(res);
      this.submitted = true;
    });
  }
  newMsg(): void {
    this.submitted = false;
    this.requestForm.reset();
    this.imageSrc = '';
  }
}
