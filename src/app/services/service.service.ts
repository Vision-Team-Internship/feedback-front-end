import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department, Floor, Room, SendMessage } from 'src/model';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private http: HttpClient) {}

  private roomApi = '//feedback-project-api.herokuapp.com/api/v1/rooms';
  private floorApi = 'https://feedback-project-api.herokuapp.com/api/v1/floors';
  private departmentApi =
    'https://feedback-project-api.herokuapp.com/api/v1/departments';
  private messageApi =
    'https://feedback-project-api.herokuapp.com/api/v1/feedbacks';

  public getfloor(): Observable<Floor[]> {
    return this.http.get<Floor[]>(this.floorApi);
  }
  public getfloorDetail(id: string): Observable<Floor[]> {
    return this.http.get<Floor[]>(this.floorApi + '/' + id);
  }
  public getDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentApi);
  }

  public getRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomApi);
  }

  public sendMessage(data: SendMessage): Observable<any> {
    return this.http.post(this.messageApi, data);
  }

  public getRoomDetail(id: string) {
    return this.http.get<Room[]>(this.roomApi + '/' + id);
  }
}
