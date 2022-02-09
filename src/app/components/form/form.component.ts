import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Service } from 'src/app/services/service.service';
import { Department, Floor, Room, SendMessage } from 'src/model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private service: Service, private fb: FormBuilder) {}
  imageSrc: string | undefined;
  submitForm: FormGroup = new FormGroup({});
  floors: Floor[] = [];
  departments: Department[] = [];
  rooms: Room[] = [];
  submitted = false;
  floorID: string | undefined = '';
  departmentID: string | undefined = '';
  roomID: string | undefined = '';

  ngOnInit(): void {
    this.service.getfloor().subscribe((data: any) => {
      console.log(data);
      this.floors = data.payload;
    });
    this.service.getDepartment().subscribe((data: any) => {
      console.log(data);
      this.departments = data.payload;
    });
    this.service.getRoom().subscribe((data: any) => {
      console.log(data);
      this.rooms = data.payload;
    });
    this.submitForm = this.fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      feedbackLevel: new FormControl(''),
      floor_id: new FormControl(''),
      room_id: new FormControl(''),
      department_id: new FormControl(''),
      url: new FormControl(''),
    });
  }

  getRoomID(id: any) {
    console.log('RoomID', id);
    this.roomID = id;
    this.submitForm.controls['room_id'].setValue(id);
  }
  getDepartmentID(id: any) {
    console.log('DepartmentID', id);
    this.departmentID = id;
    this.submitForm.controls['department_id'].setValue(id);
    this.submitForm.controls['room_id'].setValue('');
  }
  getFloorID(id: any) {
    console.log(id);
    this.floorID = id;
    this.departmentID = '';
    this.submitForm.controls['floor_id'].setValue(id);
    this.submitForm.controls['department_id'].setValue('');
  }

  onFileSelect(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.submitForm.get('url')?.setValue(reader);
      };
    }
  }

  sendMessage(): void {
    let feedBackType = '';
    let uniqueIDs = [''];
    if (this.submitForm.controls['floor_id'].value != '') {
      feedBackType = 'floor';
      uniqueIDs = [this.submitForm.controls['floor_id'].value];
      if (this.submitForm.controls['department_id'].value != '') {
        feedBackType = 'department';
        uniqueIDs = [this.submitForm.controls['department_id'].value];
        if (this.submitForm.controls['room_id'].value != '') {
          uniqueIDs = [this.submitForm.controls['room_id'].value];
          feedBackType = 'room';
        }
      }
    }
    const data: SendMessage = {
      title: this.submitForm.controls['title'].value,
      message: this.submitForm.controls['message'].value,
      feedbackLevel: this.submitForm.controls['feedbackLevel'].value,
      feedbackType: feedBackType,
      uniqueIDs: uniqueIDs,
      type: 'report',
      url: this.submitForm.controls['url'].value,
    };

    console.log(data);

    this.service.sendMessage(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        this.floorID = '';
        this.departmentID = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newMsg(): void {
    this.submitted = false;
    this.submitForm.reset();
  }
}
