import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Department, Floor } from 'src/model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  floors: Floor[] = [];
  departmentForm!: FormGroup;
  displayDeleteDepartmentBtn = false;

  constructor(
    private departmentService: AdminService,
    private floorService: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartment().subscribe((data: any) => {
      console.log(data.payload);
      this.departments = data.payload;
    });
    this.floorService.getfloor().subscribe((data: any) => {
      console.log(data.payload);
      this.floors = data.payload;
    });
    this.departmentForm = this.fb.group({
      name: [''],
      floor_id: [''],
      manager_id: ['6184ab92023632142ea407ac'],
    });
  }

  get f() {
    return this.departmentForm.controls;
  }

  addDepartment() {
    const data: Department = {
      name: this.f.name.value,
      floor_id: this.f.floor_id.value,
      manager_id: this.f.manager_id.value,
    };
    this.departmentService.createDepartment(data).subscribe((response) => {
      console.log(data);
      console.log(response);
      this.departments.push(response.payload);
    });
    this.departmentForm.reset();
  }

  deleteDepartment(id: any) {
    this.departmentService.deleteDepartment(id).subscribe(
      (response) => {
        console.log(response, id);
        this.departments = this.departments.filter(
          (department) => department._id != id
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  displayDeleteDepartment() {
    this.displayDeleteDepartmentBtn = true;
  }

  doneBtn() {
    this.displayDeleteDepartmentBtn = false;
  }
}
