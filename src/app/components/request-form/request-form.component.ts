import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  data: any = this.adminService.user
  ngOnInit(): void {
    console.log(this.data)
  }

}
