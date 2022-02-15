import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service.service';
import { Floor } from 'src/model';

@Component({
  selector: 'app-home-floor-item',
  templateUrl: './home-floor-item.component.html',
  styleUrls: ['./home-floor-item.component.css'],
})
export class HomeFloorItemComponent implements OnInit {
  constructor(
    private service: Service,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  floorID: any;
  floorData: Floor | any;
  submitForm: FormGroup = new FormGroup({});
  submitted = false;
  imageSrc: any;
  file: any = '';
  fileName: any = '';

  ngOnInit(): void {
    this.floorID = this.actRoute.snapshot.params['id'];
    this.service.getfloorDetail(this.floorID).subscribe((floor: any) => {
      console.log(floor);
      this.floorData = floor.payload;
    });
    this.submitForm = this.fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      feedbackLevel: new FormControl(''),
      floor_id: new FormControl(''),
      url: new FormControl(''),
    });
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

  sendMessage(): void {
    const formData = new FormData();

    formData.append('url', this.file);
    formData.append('title', this.submitForm.controls['title'].value);
    formData.append('message', this.submitForm.controls['message'].value);
    formData.append(
      'feedbackLevel',
      this.submitForm.controls['feedbackLevel'].value
    );
    formData.append('feedbackType', 'floor');
    formData.append('uniqueIDs', this.floorID);
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

  newMsg(): void {
    this.submitted = false;
    this.imageSrc = '';
    this.submitForm.reset();
  }
}
