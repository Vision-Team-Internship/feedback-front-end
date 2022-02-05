import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Message, UpdateMessage } from 'src/model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  highMessages: Message[] = [];
  normalMessages: Message[] = [];
  location: string[] = [];
  displayActionBtn = false;
  messageID: string = '';
  highFeedback = true;
  normalFeedback = false;
  approvedForm!: FormGroup;
  constructor(
    private messageService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.messageService.getHighMessage().subscribe((data: any) => {
      console.log('High', data.payload);
      this.highMessages = data.payload;
    });
    this.messageService.getNormalMessage().subscribe((data: any) => {
      console.log('Normal', data.payload);
      this.normalMessages = data.payload;
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
    if (this.highFeedback) {
      this.highMessages = this.highMessages.filter(
        (highMessages) => highMessages._id != id
      );
    } else {
      this.normalMessages = this.normalMessages.filter(
        (highMessages) => highMessages._id != id
      );
    }
    this.messageService.approvedMessage(msg).subscribe((res) => {
      console.log(res);
    });
  }

  deleteMessage(id: string) {
    if (this.highFeedback) {
      this.highMessages = this.highMessages.filter(
        (messages) => messages._id != id
      );
    }
    if (this.normalMessages) {
      this.normalMessages = this.normalMessages.filter(
        (messages) => messages._id != id
      );
    }
    this.messageService.deleteMessage(id).subscribe((res) => {
      console.log(res);
    });
  }
  showNormal() {
    this.normalFeedback = true;
    this.highFeedback = false;
  }
  showHigh() {
    this.highFeedback = true;
    this.normalFeedback = false;
  }
  msgItem(msg_ID: string) {
    this.router.navigate(['/d/msg', msg_ID]);
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
