import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-admin-ticket-forward',
  templateUrl: './admin-ticket-forward.component.html',
  styleUrls: ['./admin-ticket-forward.component.css']
})
export class AdminTicketForwardComponent implements OnInit {
  dept: any[] = []
  frm = new FormGroup({
    ticketId: new FormControl(0 ),
    departmentId: new FormControl(0, [Validators.required, Validators.min(1)])
  })
  constructor(private service: ServiceAPIGetwayService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.LoadDept();
  }
  LoadDept() {
    this.service.Get('Admin/GetDepartments?all=true').subscribe
      (
        res => { this.dept = res }
      )
  }
  selectChange(dep: any) {
    this.frm.controls.departmentId.patchValue(dep)
  }
  Submit() {
    this.frm.controls.ticketId.patchValue(this.data)
    this.service.Post('Ticket/ForwardTicket',this.frm.value).subscribe
    (
      res=>{this.service.showSuccess();this.service.filter('filterDate')}
    )
  }

}
