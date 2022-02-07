import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Message } from 'src/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completed-message',
  templateUrl: './completed-message.component.html',
  styleUrls: ['./completed-message.component.css'],
})
export class CompletedMessageComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) {}

  completedMessage: Message[] = [];
  messageID: string = '';
  checks = false;
  disabled = true;

  ngOnInit(): void {
    this.adminService.getCompletedMessage().subscribe((data: any) => {
      console.log('Completed Message', data.payload);
      this.completedMessage = data.payload;
    });
  }

  deleteMessage(id: string) {
    this.adminService.deleteMessage(id).subscribe((res) => {
      console.log(res);
      this.completedMessage = this.completedMessage.filter(
        (completedMessage) => completedMessage._id != id
      );
    });
  }

  msgItem(msg_ID: string) {
    this.router.navigate(['/d/msg-completed', msg_ID]);
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
    this.adminService.getCompletedMessage().subscribe((data: any) => {
      console.log('Completed Message', data.payload);
      this.completedMessage = data.payload;
    });
  }

  showAction(id: string) {
    this.messageID = id;
  }

  hideAction() {
    this.messageID = '';
  }

  ok() {}
}
