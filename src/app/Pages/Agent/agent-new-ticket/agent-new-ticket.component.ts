import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-agent-new-ticket',
  templateUrl: './agent-new-ticket.component.html',
  styleUrls: ['./agent-new-ticket.component.css']
})
export class AgentNewTicketComponent implements OnInit {
  _helptopic: any[] = []
  _priority: any[] = []
  _dept: any[] = []
  frm = new FormGroup({
    ticketId: new FormControl(0),
    userId: new FormControl(0, [Validators.required, Validators.min(0)]),
    subject: new FormControl('', [Validators.required, Validators.minLength(5)]),
    body: new FormControl('', [Validators.required, Validators.minLength(5)]),
    statusId: new FormControl(1, [Validators.required, Validators.min(1)]),
    priorityId: new FormControl(0, [Validators.required, Validators.min(1)]),
    topicId: new FormControl(0, [Validators.required, Validators.min(1)]),
    departmentId: new FormControl(0, [Validators.required, Validators.min(1)]),
  })
  constructor(private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
    this.LoadHelpTopic();
    this.Loadpriority();
    this.Loaddept();
  }
  LoadHelpTopic() {
    this.service.Get('Admin/GetHelpTopics').subscribe
      (
        res => { this._helptopic = res }
      )
  }
  Loadpriority() {
    this.service.Get('Admin/GetPriorityes').subscribe
      (
        res => { this._priority = res }
      )
  }

  Loaddept() {
    this.service.Get('Admin/GetDepartments?all=false').subscribe
      (
        res => { this._dept = res }
      )
  }


  submit() {
    this.frm.controls.userId.patchValue(Number(this.service.userId))
    this.service.Post('Ticket/AddTicket', this.frm.value).subscribe
      (
        res => { this.ResetFrm(res) }
      )
  }
  ResetFrm(res: any) {
    this.service.showSuccess()
    this.frm.reset()
    this.frm.controls.ticketId.patchValue(0)
    this.frm.controls.userId.patchValue(0)
    this.frm.controls.priorityId.patchValue(0)
    this.frm.controls.topicId.patchValue(0)
    this.frm.controls.statusId.patchValue(1)
    this.frm.controls.departmentId.patchValue(0)
    this.frm.controls.body.patchValue('')

  }
}
