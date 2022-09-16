import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-admin-ticket-add-note',
  templateUrl: './admin-ticket-add-note.component.html',
  styleUrls: ['./admin-ticket-add-note.component.css']
})
export class AdminTicketAddNoteComponent implements OnInit {
  frm = new FormGroup({
    ticketCommentId: new FormControl(0),
    ticketId: new FormControl(0),
    userId: new FormControl(0, [Validators.required, Validators.min(1)]),
    comment: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fullName: new FormControl(''),
  })
  comment: any[] = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
    this.LoadComment();
  }

  LoadComment() {
    this.comment = []
    this.service.Get('Ticket/GetTicketComments/' + this.data).subscribe
      (
        res => { this.comment = res }
      )
  }
  Submit() {
    this.frm.controls.userId.patchValue(this.service.userId)
    this.frm.controls.ticketId.patchValue(this.data)
    console.log(this.frm.value)
    this.service.Post('Ticket/AddComment', this.frm.value).subscribe
      (
        res => { this.service.showSuccess(), this.LoadComment() },
        err => { this.service.showError('Error@ ' + err) }
      )
  }

}
