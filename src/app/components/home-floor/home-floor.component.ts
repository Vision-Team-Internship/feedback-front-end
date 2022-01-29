import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';
import { Floor } from 'src/model';

@Component({
  selector: 'app-home-floor',
  templateUrl: './home-floor.component.html',
  styleUrls: ['./home-floor.component.css'],
})
export class HomeFloorComponent implements OnInit {
  constructor(private service: Service) {}
  floors: Floor[] = [];
  ngOnInit(): void {
    this.service.getfloor().subscribe((data: any) => {
      console.log(data);
      this.floors = data.payload;
    });
  }
}
