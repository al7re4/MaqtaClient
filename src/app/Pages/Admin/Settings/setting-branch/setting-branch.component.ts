import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';

@Component({
  selector: 'app-setting-branch',
  templateUrl: './setting-branch.component.html',
  styleUrls: ['./setting-branch.component.css']
})
export class SettingBranchComponent implements OnInit {
  branch: any[] = []
  frm = new FormGroup({
    branchID: new FormControl(0),
    branchName: new FormControl(''),
  })
  constructor(private service: ServiceAPIGetwayService) { }

  ngOnInit(): void {
    this.LoadBranch();
  }


  LoadBranch() {
    this.service.Get('Admin/GetBranches').subscribe
      (
        res => { this.branch = res }
      )
  }
  Submit() {
    this.service.Post('Admin/AddBranch', this.frm.value).subscribe(
      res => { this.service.showSuccess()
      ;this.LoadBranch() },
      err => { this.service.showError('' + err) }
    )
  }
  Action(data:any,type:string)
  {
    switch (type) {
      case 'edit':
        this.frm.controls.branchID.patchValue(data.branchID)
        this.frm.controls.branchName.patchValue(data.branchName)
        break;
    
      default:
        break;
    }
  }
}
