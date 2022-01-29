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
  floorID: any;
  floorData: Floor | any;
  submitForm: FormGroup = new FormGroup({});
  submitted = false;
  newMsg(): void {
    this.submitted = false;
    this.submitForm.reset();
  }

  constructor(
    private service: Service,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
    });
  }

  sendMessage(): void {
    const data: any = {
      title: this.submitForm.controls['title'].value,
      message: this.submitForm.controls['message'].value,
      feedbackLevel: this.submitForm.controls['feedbackLevel'].value,
      feedbackType: 'floor',
      uniqueIDs: [this.floorID],
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
