import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Floor } from 'src/model';

@Component({
  selector: 'app-floor-add',
  templateUrl: './floor-add.component.html',
  styleUrls: ['./floor-add.component.css'],
})
export class FloorAddComponent implements OnInit {
  floorForm!: FormGroup;

  constructor(private fb: FormBuilder, private floorService: AdminService) {}

  @Output() onAddFloor: EventEmitter<Floor> = new EventEmitter();

  ngOnInit(): void {
    this.floorForm = this.fb.group({
      name: [''],
      manager_id: ['6184ab92023632142ea407ac'],
    });
  }

  get f() {
    return this.floorForm.controls;
  }

  onSubmit() {
    const data: any = {
      name: this.f.name.value,
      manager_id: this.f.manager_id.value,
    };

    this.onAddFloor.emit(data);
    this.floorForm.reset();
  }
}
