import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css'],
})
export class RoomItemComponent implements OnInit {
  roomID: any;
  roomData: any;
  submitForm: FormGroup = new FormGroup({});

  constructor(
    private service: Service,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.roomID = this.actRoute.snapshot.params['id'];
    this.loadRoomDetail(this.roomID);
    this.submitForm = this.fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      feedbackLevel: new FormControl(''),
      room_id: new FormControl(''),
    });
  }

  loadRoomDetail(roomID: any) {
    this.service.getRoomDetail(roomID).subscribe((room: any) => {
      this.roomData = room.payload;
    });
  }
  submitted = false;
  newMsg(): void {
    this.submitted = false;
    this.submitForm.reset();
  }
  sendMessage(): void {
    const data: any = {
      title: this.submitForm.controls['title'].value,
      message: this.submitForm.controls['message'].value,
      feedbackLevel: this.submitForm.controls['feedbackLevel'].value,
      feedbackType: 'room',
      uniqueIDs: [this.submitForm.controls['room_id'].value],
      type: 'report'
    };
    console.log(this.submitForm.value);
    console.log(data);
    this.service.sendMessage(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
