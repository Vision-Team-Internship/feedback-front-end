import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Message, UpdateMessage } from 'src/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  constructor(
    private messageService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  requestMessage: Message[] = [];
  reportMessage: Message[] = [];
  location: string[] = [];
  displayActionBtn = false;
  messageID: string = '';
  request = true;
  report = false;
  approvedForm!: FormGroup;
  checks = false;
  disabled = true;

  ngOnInit(): void {
    this.messageService.getRequestMessage().subscribe((data: any) => {
      console.log('Request Message', data.payload);
      this.requestMessage = data.payload;
    });
    this.messageService.getReportMessage().subscribe((data: any) => {
      console.log('Report Message', data.payload);
      this.reportMessage = data.payload;
    });
    this.approvedForm = this.fb.group({
      _id: [''],
    });
  }

  get f() {
    return this.approvedForm.controls;
  }

  approvedMessage(data: any, id: string) {
    this.f._id.setValue(data._id);

    const msg: UpdateMessage = {
      note: 'Your request or report has been approved and We are working on it. When the work done we will inform you again!',
      feedback_id: this.f._id.value,
    };
    if (this.request) {
      this.requestMessage = this.requestMessage.filter(
        (requests) => requests._id != id
      );
    } else {
      this.reportMessage = this.reportMessage.filter(
        (reports) => reports._id != id
      );
    }
    this.messageService.approvedMessage(msg).subscribe((res) => {
      console.log(res);
    });
  }

  deleteMessage(id: string) {
    if (this.request) {
      this.requestMessage = this.requestMessage.filter(
        (requests) => requests._id != id
      );
    } else {
      this.reportMessage = this.reportMessage.filter(
        (reports) => reports._id != id
      );
    }
    this.messageService.deleteMessage(id).subscribe((res) => {
      console.log(res);
    });
  }

  showReport() {
    this.report = true;
    this.request = false;
    this.checks = false;
  }

  showRequest() {
    this.request = true;
    this.report = false;
    this.checks = false;
  }

  msgItem(msg_ID: string) {
    this.router.navigate(['/d/msg', msg_ID]);
  }

  selectAll() {
    this.checks = !this.checks;
  }

  reload() {
    this.approvedForm = this.fb.group({
      _id: [''],
    });
    Swal.fire({
      position: 'top-end',
      title: 'Loading...',
      showConfirmButton: false,
      timer: 500,
      width: 220,
    });
    if (this.request) {
      this.messageService.getRequestMessage().subscribe((data: any) => {
        console.log('Request Message', data.payload);
        this.requestMessage = data.payload;
      });
    } else {
      this.messageService.getReportMessage().subscribe((data: any) => {
        console.log('Report Message', data.payload);
        this.reportMessage = data.payload;
      });
    }
  }

  ok() {
    console.log('ok');
    alert('ok');
  }
  showAction(id: string) {
    this.messageID = id;
  }
  hideAction() {
    this.messageID = '';
  }
}
