import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';
import { Room } from 'src/model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  constructor(private service: Service) {}
  rooms: Room[] = [];
  ngOnInit(): void {
    this.service.getRoom().subscribe((data: any) => {
      console.log(data);
      this.rooms = data.payload;
    });
  }
}
