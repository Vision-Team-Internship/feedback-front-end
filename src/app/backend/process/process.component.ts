import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Message, UpdateMessage } from 'src/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
})
export class ProcessComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  inProcessMessage: Message[] = [];
  messageID: string = '';
  completeMessageForm!: FormGroup;
  checks = false;
  disabled = true;

  ngOnInit(): void {
    this.adminService.getInProccessMessage().subscribe((data: any) => {
      console.log('In Processing', data.payload);
      this.inProcessMessage = data.payload;
    });
    this.completeMessageForm = this.fb.group({
      _id: [''],
    });
  }

  get f() {
    return this.completeMessageForm.controls;
  }

  completeMessage(data: any, id: string) {
    this.f._id.setValue(data._id);

    const msg: UpdateMessage = {
      note: 'Your request or report has been solved',
      feedback_id: this.f._id.value,
    };
    this.inProcessMessage = this.inProcessMessage.filter(
      (inProcessMessage) => inProcessMessage._id != id
    );
    this.adminService.completeMessage(msg).subscribe((res) => {
      console.log(res);
    });
  }

  deleteMessage(id: string) {
    this.inProcessMessage = this.inProcessMessage.filter(
      (inProcessMessage) => inProcessMessage._id != id
    );
    this.adminService.deleteMessage(id).subscribe((res) => {
      console.log(res);
    });
  }

  msgItem(msg_ID: string) {
    this.router.navigate(['/d/msg-process', msg_ID]);
  }

  selectAll() {
    this.checks = !this.checks;
  }

  reload() {
    Swal.fire({
      position: 'top-end',
      title: 'Loading...',
      showConfirmButton: false,
      timer: 500,
      width: 220,
    });
    this.adminService.getInProccessMessage().subscribe((data: any) => {
      console.log('In Processing', data.payload);
      this.inProcessMessage = data.payload;
    });
    this.completeMessageForm = this.fb.group({
      _id: [''],
    });
  }

  ok() {
    alert('ok');
  }

  showAction(id: string) {
    this.messageID = id;
  }

  hideAction() {
    this.messageID = '';
  }
}
