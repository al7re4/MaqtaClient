import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-setting-staff',
  templateUrl: './setting-staff.component.html',
  styleUrls: ['./setting-staff.component.css']
})
export class SettingStaffComponent implements OnInit {

  branch: any[] = []
  frm = new FormGroup({
    //userId: new FormControl(0),
    branchID: new FormControl(0),
    userName: new FormControl(''),
    password: new FormControl(''),
    fullName: new FormControl(''),
    isAdmin: new FormControl(false),
    email: new FormControl(''),
    mobile: new FormControl(''),

  })
  staff:any[]=[]
  constructor(private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
    this.LoadBranch();
    this.LoadStaff();
  }


  LoadBranch() {
    this.service.Get('Admin/GetBranches').subscribe
      (
        res => { this.branch = res }
      )
  }


  LoadStaff() {
    this.service.Get('Ticket/viewAgent').subscribe
      (
        res => { this.staff = res }
      )
  }
  Submit() {
    console.log(this.frm.value)
    var _isAdmin=this.frm.controls.isAdmin.value
    this.frm.controls.isAdmin.patchValue(Boolean(_isAdmin))
    this.service.Post('Admin/AddStaff',this.frm.value).subscribe
    (
      res=>{this.service.showSuccess();this.LoadStaff()}
    )
  }
  selectChange(data:any,type:string)
  {
    switch (type) {
      case 'branchID':
        this.frm.controls.branchID.patchValue(data)
        break;
      case 'isAdmin':
        this.frm.controls.isAdmin.patchValue(data)
        break;
    
      default:
        break;
    }
  }
  Action(data:any,type:string)
  {
    switch (type) {
      case 'edit':
        this.frm.controls.userName.patchValue(data.userName)
        this.frm.controls.password.patchValue(data.password)
        this.frm.controls.fullName.patchValue(data.fullName)
        //this.frm.controls.branchName.patchValue(data.branchName)
        break;
    
      default:
        break;
    }
  }

}
