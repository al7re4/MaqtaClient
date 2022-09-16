import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-admin-change-date',
  templateUrl: './admin-change-date.component.html',
  styleUrls: ['./admin-change-date.component.css']
})
export class AdminChangeDateComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  startDate:any
  endDate:any
  constructor(private _date:DatePipe,private service:ServiceAPIGetwayService) { }

  ngOnInit(): void {
  }
  submit() {
    this.startDate=this._date.transform(this.range.controls.start.value,'yyyy-MM-dd')
    this.endDate=this._date.transform(this.range.controls.end.value,'yyyy-MM-dd')
    
    localStorage.setItem('startDate',this.startDate)
    localStorage.setItem('endDate',this.endDate)
    this.service.filter('filterDate')
  }
}
