import { Component, OnInit } from '@angular/core';
import { ServiceAPIGetwayService } from '../service-apigetway.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentdate = new Date();
  userId: any
  role:any
  _groups: any[] = []
  fullname:any
  constructor(private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
    this.fullname=localStorage.getItem('fullname');
    this.LoadPages()
    this.getCurrentDate();
  }
  getCurrentDate() {
    setInterval(() => {
      this.currentdate = new Date()
    }, 1000);
  }

  LoadPages() {
    this.userId = Number(localStorage.getItem('userid'))
    this.role = localStorage.getItem('role')
    this.service.Get('Pages/GetPageGroups/' + this.userId+'/'+this.role).subscribe
    (
      res => { this._groups = res }
    )
  }
}
