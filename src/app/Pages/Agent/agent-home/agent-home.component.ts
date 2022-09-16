import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';
import { AgentDetailsTicketComponent } from '../agent-details-ticket/agent-details-ticket.component';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements OnInit {
  ticket: any[] = []
  ticketCount: any[] = []
  constructor(private service: ServiceAPIGetwayService,
    public dialog: MatDialog) {
      this.service.Listen().subscribe
      ((x: any) => {

        if (x == 'LoadTicket') {
          this.LoadTicket();
        }

      })
     }

  ngOnInit(): void {
    this.LoadTicket();
this.service.InitSignalR()
  }
  LoadTicket() {
    this.ticket = [];
    this.service.Get('Ticket/TicketViews?UserId=' + this.service.userId).subscribe
      (res => {
        this.ticket = res;
        this.LoadTicketCount();
      })
  }

  LoadTicketCount() {
    this.ticketCount = [];
    this.service.Get('Ticket/TicketAgentCounts/' + this.service.userId).subscribe
      (res => { this.ticketCount = res })
  }

  openDetails(data: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100%';
    dialogConfig.width = '50%';
    dialogConfig.data = data;
    this.dialog.open(AgentDetailsTicketComponent, dialogConfig);
  }
}
