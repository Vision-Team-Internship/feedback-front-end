import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Message } from 'src/model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  messageID: string = '';
  messageData: any = '';
  userData: any = this.adminService.user;

  ngOnInit(): void {
    this.messageID = this.actRoute.snapshot.params['id'];
    console.log(this.messageID);
    this.loadRoomDetail(this.messageID);
    console.log(this.messageData);
  }

  loadRoomDetail(roomID: any) {
    this.adminService.getMessageById(roomID).subscribe((room: any) => {
      this.messageData = room.payload;
      console.log(room.payload);
    });
  }
  ok() {
    console.log('ok');
    alert('ok');
  }
}
