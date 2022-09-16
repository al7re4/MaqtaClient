import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';
import { AdminTicketActionComponent } from '../admin-ticket-action/admin-ticket-action.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  ticket: any[] = []
  startDate: any
  endDate: any
  search = ''
  deaptSum:any[]=[]
  systemSum:any[]=[]
  dtOptions: DataTables.Settings = {};
  constructor(private service: ServiceAPIGetwayService,
    private _date: DatePipe, public dialog: MatDialog) {
    this.service.Listen().subscribe
      ((x: any) => {

        if (x == 'filterDate') {
          this.LoadTicket()
          this.LoadDeptSum()
          this.LoadSysSum()
        }

      })
  }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    
    this.LoadTicket()
    this.LoadDeptSum()
    this.LoadSysSum()
  }

  LoadTicket() {
    let data = localStorage.getItem('startDate')
    if (data != null) {
      this.startDate = localStorage.getItem('startDate')
      this.endDate = localStorage.getItem('endDate')
    }
    else {

      this.startDate = this._date.transform(new Date(), 'yyyy-MM-dd')
      this.endDate = this._date.transform(new Date(), 'yyyy-MM-dd')
    }
    this.ticket = []
    this.service.Get('Ticket/TicketViews?All=true&startDate='
      + this.startDate + '&endDate=' + this.endDate + '').subscribe
      (
        res => { this.ticket = res }
      )
  }

  openDetails(data: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = data
    this.dialog.open(AdminTicketActionComponent, dialogConfig);
  }

  LoadDeptSum()
  {
    this.service.Get('Ticket/GetDepartmentSummaries').subscribe
    (
      res=>{this.deaptSum=res}
    )
  }

  LoadSysSum()
  {
    this.systemSum=[]
    this.service.Get('Ticket/GetSystemSummaries').subscribe
    (
      res=>{this.systemSum=res}
    )
  }
}
