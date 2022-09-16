import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-admin-ticket-close',
  templateUrl: './admin-ticket-close.component.html',
  styleUrls: ['./admin-ticket-close.component.css']
})
export class AdminTicketCloseComponent implements OnInit {

  frm = new FormGroup({
    ticketId: new FormControl(0),
    //userId: new FormControl(0, [Validators.required, Validators.min(1)]),
    resonseOfClose: new FormControl('', [Validators.required,Validators.minLength(5)]),
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
  
  }
  Submit() {
    //this.frm.controls.userId.patchValue(this.service.userId)
    this.frm.controls.ticketId.patchValue(this.data)
    console.log(this.frm.value)
    this.service.Post('Ticket/CloseTicket',this.frm.value).subscribe
    (
      res=>{this.service.showSuccess(),this.service.filter('filterDate')},
      err=>{this.service.showError('Error@ '+err)}
    )
  }
}
