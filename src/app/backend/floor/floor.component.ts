import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Floor } from 'src/model';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css'],
})
export class FloorComponent implements OnInit {
  deleteBtn = false;

  floors: Floor[] = [];
  id: any;
  constructor(private floorService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.floorService.getfloor().subscribe((data: any) => {
      console.log(data.payload);
      this.floors = data.payload;
    });
  }

  deleteFloor(id: any) {
    this.floorService.deleteFloor(id).subscribe(
      (response) => {
        console.log(response, id);
        this.floors = this.floors.filter((floor) => floor._id != id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  displayDeleteBtn() {
    this.deleteBtn = true;
  }
  doneDeleteBtn() {
    this.deleteBtn = false;
  }
  addFloor(floor: Floor) {
    this.floorService.createFloor(floor).subscribe(
      (response) => {
        console.log(response);
        console.log(floor);
        this.floors.push(response.payload);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
