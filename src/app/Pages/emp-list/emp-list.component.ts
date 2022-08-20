import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceAPIGetwayService } from 'src/app/Shared/service-apigetway.service';
import { EmpAddNewComponent } from '../emp-add-new/emp-add-new.component';
import Swal from 'sweetalert2'
import { HttpErrorResponse} from '@angular/common/http';
@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  _emplist: any[] = []

  constructor(private getWay: ServiceAPIGetwayService,
    public dialog: MatDialog) {
    this.getWay.Listen().subscribe
      ((x: any) => {
        //refresh emp data after insert,update from popup page
        if (x == 'RefreshList') {
          this.LoadData();
        }

      })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.LoadData();
    this.getWay.InitSignalR()
  }

  async LoadData() {
    this._emplist = []

      this.getWay.Get("Employee/GetAllEmpsAsync")
      .subscribe({
        next: (result: any) => this._emplist = result,
        error: (err: HttpErrorResponse) => console.log(err)
      })

  }
  EditEmp(data: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = data;
    this.dialog.open(EmpAddNewComponent, dialogConfig);
  }

  async DeleteEmp(data: any) {
    Swal.fire({
      title: 'Alert',
      text: 'Delete (' + data.fullName + ')?',
      icon: 'warning',
      confirmButtonText: 'Delete',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ConfirmDelete(data.empId)
      }
    });

  }

  ConfirmDelete(empId: any) {
    this.getWay.Delete('Employee/DeleteEmpAsync/' + empId).subscribe
      (
        res => {
          [this.LoadData(), this.getWay.showSuccess()]
        }
      )
  }
   
  
}
