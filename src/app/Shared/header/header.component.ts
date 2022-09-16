import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { EmpAddNewComponent } from 'src/app/Pages/emp-add-new/emp-add-new.component';
import { ServiceAPIGetwayService } from '../service-apigetway.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() ToggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  notfi: any[] = []
  role:any
  constructor(public dialog: MatDialog, private getWay: ServiceAPIGetwayService,
    private router: Router) {
      this.role=localStorage.getItem('role')
      this.getWay.Listen().subscribe
      ((x: any) => {

        if (x == 'filterDate') {
         this.LoadNotifi()
        }

      })
     }

  ngOnInit(): void {
 
    this.LoadNotifi()
  }
  toglesidebar() {
    this.ToggleSidebarForMe.emit();
  }

  AddEmp() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    this.dialog.open(EmpAddNewComponent, dialogConfig);
  }
  Exit() {
    localStorage.clear();
    this.router.navigate(["/"]);
    this.getWay.isUserAuthenticated()

  }
  Send() {
    let frmMessage = new FormGroup({
      message: new FormControl('SignalR Message With Toke JWT ....')
    })

    this.getWay.Post('Employee/SendMessage', frmMessage.value).subscribe();
  }

  LoadNotifi() {
    this.getWay.Get('Ticket/TicketViews?statusId=1').subscribe
      (
        res => { this.notfi = res }
      )
  }
}
