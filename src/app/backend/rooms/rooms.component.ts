import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Department, Floor, Room } from 'src/model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  displayDeleteBtn = false;
  displayFloor = false;
  roomForm: FormGroup = new FormGroup({});
  messages: Message[] = [];
  rooms: Room[] = [];
  departments: Department[] = [];
  floors: Floor[] = [];

  constructor(private roomService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.roomService.getMessage().subscribe((data: any) => {
    //   console.log(data.payload);
    //   this.messages = data.payload;
    // });
    this.roomService.getRoom().subscribe((data: any) => {
      console.log('room', data.payload);
      this.rooms = data.payload;
    });
    this.roomService.getDepartment().subscribe((data: any) => {
      console.log('room', data.payload);
      this.departments = data.payload;
    });
    this.roomService.getfloor().subscribe((data: any) => {
      console.log('room', data.payload);
      this.floors = data.payload;
    });
    this.roomForm = this.fb.group({
      name: [''],
      department_id: [''],
      manager_id: ['6184ab92023632142ea407ac'],
    });
  }

  get f() {
    return this.roomForm.controls;
  }

  addRoom() {
    const data: Room = {
      name: this.f.name.value,
      department_id: this.f.department_id.value,
      manager_id: this.f.manager_id.value,
    };

    console.log(data);

    this.roomService.createRoom(data).subscribe((res) => {
      console.log(res);
      this.rooms.push(res.payload);
    });

    this.roomForm.reset();
  }
  deteleRoom(id: any) {
    this.roomService.deleteRoom(id).subscribe((res) => {
      console.log(res, 'roomID = ' + id);
      this.rooms = this.rooms.filter((rooms) => rooms._id != id);
    });
  }
  displayDeleteRoom() {
    this.displayDeleteBtn = true;
  }
  done() {
    this.displayDeleteBtn = false;
  }

  showFloor() {
    this.displayFloor = true;
  }
  hideFloor() {
    this.FloorID = '';
    this.displayFloor = false;
  }

  FloorID = '';

  getFloorId(id: any) {
    console.log('floor', id);
    this.FloorID = id;
  }
}
