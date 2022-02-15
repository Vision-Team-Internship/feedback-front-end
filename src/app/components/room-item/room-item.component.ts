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
  constructor(
    private service: Service,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  roomID: any;
  roomData: any;
  submitForm: FormGroup = new FormGroup({});
  imageSrc: any;
  file: any = '';
  fileName: any = '';
  submitted = false;

  ngOnInit(): void {
    this.roomID = this.actRoute.snapshot.params['id'];
    this.loadRoomDetail(this.roomID);
    this.submitForm = this.fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      feedbackLevel: new FormControl(''),
      room_id: new FormControl(''),
      url: new FormControl(''),
    });
  }

  loadRoomDetail(roomID: any) {
    this.service.getRoomDetail(roomID).subscribe((room: any) => {
      this.roomData = room.payload;
    });
  }

  newMsg(): void {
    this.submitted = false;
    this.imageSrc = '';
    this.submitForm.reset();
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

  sendMessage() {
    const formData = new FormData();

    formData.append('url', this.file);
    formData.append('title', this.submitForm.controls['title'].value);
    formData.append('message', this.submitForm.controls['message'].value);
    formData.append(
      'feedbackLevel',
      this.submitForm.controls['feedbackLevel'].value
    );
    formData.append('feedbackType', 'room');
    formData.append('uniqueIDs', this.roomID);
    formData.append('type', 'report');

    this.service.sendMessage(formData).subscribe(
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
