import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.css']
})
export class ReportHomeComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  showResult = false;
  ticket: any[] = []
  dtOptions: DataTables.Settings = {};
  agent: any[] = []
  _AgentId: any
  constructor(private service: ServiceAPIGetwayService,
    private _date: DatePipe) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.LoadAgent()
  }

  LoadTicket() {

    var startDate = this._date.transform(this.range.controls.start.value, 'yyyy-MM-dd')
    var endDate = this._date.transform(this.range.controls.end.value, 'yyyy-MM-dd')
    this.service.Get('Ticket/TicketViews?All=true&startDate=' +
      startDate + '&endDate=' + endDate + '').subscribe(
        res => { this.showResult = true, this.ticket = res }
      )
  }

  Search() {
    this.LoadTicket();
  }

  LoadAgent() {
    this.service.Get('Ticket/viewAgent').subscribe
      (
        res => { this.agent = res }
      )
  }
  SearchbyAgent() {
    this.service.Get('Ticket/TicketViews?UserId=' + this._AgentId).subscribe(
      res => { this.showResult = true, this.ticket = res }
    )
  }
  SelectChange(data: any) {
    this._AgentId = data

  }
}
