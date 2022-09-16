import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-setting-department',
  templateUrl: './setting-department.component.html',
  styleUrls: ['./setting-department.component.css']
})
export class SettingDepartmentComponent implements OnInit {

  department: any[] = []
  frm = new FormGroup({
    departmentId: new FormControl(0),
    departmentName: new FormControl(''),
    forPublic: new FormControl(false),
  })
  constructor(private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
    this.LoadDepartment();
  }


  LoadDepartment() {
    this.service.Get('Admin/GetDepartments?all=true').subscribe
      (
        res => { this.department = res }
      )
  }
  Submit() {
    this.service.Post('Admin/AddDepartment', this.frm.value).subscribe(
      res => {
        this.service.showSuccess()
        ; this.LoadDepartment()
      },
      err => { this.service.showError('' + err) }
    )
  }
  Action(data: any, type: string) {
    switch (type) {
      case 'edit':
        this.frm.controls.departmentId.patchValue(data.departmentId)
        this.frm.controls.departmentName.patchValue(data.departmentName)
        this.frm.controls.forPublic.patchValue(data.forPublic)
        break;

      default:
        break;
    }
  }

}
