import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';
import { AdminChangeDateComponent } from '../admin-change-date/admin-change-date.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  ticketCards: any[] = []
  _showwarn = false
  _warn = ''
  _startDate: any
  startDate: any
  endDate: any
  constructor(private service: ServiceAPIGetwayService, private _date: DatePipe,
    public dialog: MatDialog) {
    this.service.Listen().subscribe
      ((x: any) => {

        if (x == 'filterDate') {
          this.LoadTicketCard();
          this.ShowFilterDate()
        }

      })
  }

  ngOnInit(): void {
    this.LoadTicketCard();
    this.ShowFilterDate()
    this.service.InitSignalR()
  }

  LoadTicketCard() {
    let data = localStorage.getItem('startDate')
    if (data != null) {
      this.startDate = localStorage.getItem('startDate')
      this.endDate = localStorage.getItem('endDate')
    }
    else {

      this.startDate = this._date.transform(new Date(), 'yyyy-MM-dd')
      this.endDate = this._date.transform(new Date(), 'yyyy-MM-dd')
    }
    this.ticketCards = [];
    this.service.Get('Admin/AdminGetStatuesForDashboard/'
      + this.startDate + '/' + this.endDate + '').subscribe
      (
        res => { this.ticketCards = res }
      )
  }

  ChangeDate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    this.dialog.open(AdminChangeDateComponent, dialogConfig);
  }

  ShowFilterDate() {
    this._startDate = localStorage.getItem('startDate')
    if (this._startDate) {
      this._showwarn = true
      this._warn = 'Filter Date => ' + localStorage.getItem('startDate') + ' to ' + localStorage.getItem('endDate')

    }

  }
  RemoveFilter() {
    localStorage.removeItem('startDate')
    localStorage.removeItem('endDate')
    this.ShowFilterDate()
    this._showwarn = false
    this._warn = ''
    this.service.filter('filterDate')
  }
}
