import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminTicketAddNoteComponent } from '../admin-ticket-add-note/admin-ticket-add-note.component';
import { AdminTicketCloseComponent } from '../admin-ticket-close/admin-ticket-close.component';
import { AdminTicketForwardComponent } from '../admin-ticket-forward/admin-ticket-forward.component';
import { AdminTicketReplyComponent } from '../admin-ticket-reply/admin-ticket-reply.component';

@Component({
  selector: 'app-admin-ticket-action',
  templateUrl: './admin-ticket-action.component.html',
  styleUrls: ['./admin-ticket-action.component.css']
})
export class AdminTicketActionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  Reply() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = this.data.ticketId
    this.dialog.open(AdminTicketReplyComponent, dialogConfig);
  }

  CloseTicket() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = this.data.ticketId
    this.dialog.open(AdminTicketCloseComponent, dialogConfig);
  }
  AddNote() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = this.data.ticketId
    this.dialog.open(AdminTicketAddNoteComponent, dialogConfig);
  }
  Forward() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = this.data.ticketId
    this.dialog.open(AdminTicketForwardComponent, dialogConfig);
  }
}
