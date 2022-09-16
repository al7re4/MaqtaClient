import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agent-details-ticket',
  templateUrl: './agent-details-ticket.component.html',
  styleUrls: ['./agent-details-ticket.component.css']
})
export class AgentDetailsTicketComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.ticketReplies)
  }

}
