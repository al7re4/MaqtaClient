import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-admin-ticket-reply',
  templateUrl: './admin-ticket-reply.component.html',
  styleUrls: ['./admin-ticket-reply.component.css']
})
export class AdminTicketReplyComponent implements OnInit {
  frm = new FormGroup({
    ticketId: new FormControl(0),
    userId: new FormControl(0, [Validators.required, Validators.min(1)]),
    response: new FormControl('', [Validators.required,Validators.minLength(5)]),
  })
  sms=false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
  
  }
  change(re:any)
  {
    
this.sms=re.checked
  }
  Submit() {
    this.frm.controls.userId.patchValue(this.service.userId)
    this.frm.controls.ticketId.patchValue(this.data)
    this.service.Post('Ticket/AddTicketReply',this.frm.value).subscribe
    (
      res=>{this.service.showSuccess(),this.service.filter('filterDate')},
      err=>{this.service.showError('Error@ '+err)}
    )
    if(this.sms)
    {
      this.service.Get('Ticket/SendSMS?mobile=925620212&msg=Your request has been answered,Help Desk Team ').subscribe()
    }
  }
}
