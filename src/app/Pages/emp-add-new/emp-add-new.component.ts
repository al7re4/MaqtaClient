import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-emp-add-new',
  templateUrl: './emp-add-new.component.html',
  styleUrls: ['./emp-add-new.component.css']
})
export class EmpAddNewComponent implements OnInit {
  frmEmp = new FormGroup({
    empId: new FormControl(0),
    fullName: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    joinedDate: new FormControl('', [Validators.required]),
    jobId: new FormControl(0, [Validators.required, Validators.min(1)]),
    departmentId: new FormControl(0, [Validators.required, Validators.min(1)]),
  })
  _jobslist: any = []
  _deptslist: any = []


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private getWay: ServiceAPIGetwayService, private _datepipe: DatePipe) {
  
  }

  ngOnInit(): void {

    this.getJobs();
    this.getDepartments()
    this.fetchOldData()
  }

  async getJobs() {
    this.getWay.Get('Settings/GetJobsAsync').subscribe
      (
        res => { this._jobslist = res }
      )
  }

  async getDepartments() {
    this.getWay.Get('Settings/GetDepartmentsAsync').subscribe
      (
        res => { this._deptslist = res }
      )
  }

  submit() {

    if (this.frmEmp.valid) {

      var joindate = this._datepipe.transform(this.frmEmp.controls.joinedDate.value, 'yyyy-MM-dd')
      this.frmEmp.controls.joinedDate.patchValue(joindate);
      this.getWay.Post('Employee/AddEmployee', this.frmEmp.value).subscribe
        (
          res => { [ this.getWay.filter('RefreshList')] }
        )
    }
    else {
      this.getWay.showError('fill all data');
    }


  }

  fetchOldData() {
    if (this.data) {
      this.frmEmp.controls.empId.patchValue(this.data.empId);
      this.frmEmp.controls.fullName.patchValue(this.data.fullName);
      this.frmEmp.controls.email.patchValue(this.data.email);
      this.frmEmp.controls.address.patchValue(this.data.address);
      this.frmEmp.controls.tel.patchValue(this.data.tel);
      this.frmEmp.controls.joinedDate.patchValue(this.data.joinedDate);
      this.frmEmp.controls.jobId.patchValue(this.data.jobId);
      this.frmEmp.controls.departmentId.patchValue(this.data.departmentId);
    }
  }

  onChangeOption(ev: any, ctrlName: string) {

    switch (ctrlName) {
      case 'jobId':
        this.frmEmp.controls.jobId.patchValue(ev.value)
        break;

      case 'departmentId':
        this.frmEmp.controls.departmentId.patchValue(ev.value)
        break;

      default:
        break;
    }
  }
}
