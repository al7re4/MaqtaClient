import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialsModule } from './Shared/materials/materials.module';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { EmpListComponent } from './Pages/emp-list/emp-list.component';
import { EmpAddNewComponent } from './Pages/emp-add-new/emp-add-new.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";
import{SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import { NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION,
   NgxUiLoaderHttpModule, NgxUiLoaderRouterModule, NgxUiLoaderModule } from 'ngx-ui-loader';
   import { JwtModule } from "@auth0/angular-jwt";
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { AgentHomeComponent } from './Pages/Agent/agent-home/agent-home.component';
import { AgentNewTicketComponent } from './Pages/Agent/agent-new-ticket/agent-new-ticket.component';
import { AgentMyTicketComponent } from './Pages/Agent/agent-my-ticket/agent-my-ticket.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgentDetailsTicketComponent } from './Pages/Agent/agent-details-ticket/agent-details-ticket.component';
import { AdminHomeComponent } from './Pages/Admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './Pages/Admin/admin-dashboard/admin-dashboard.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { AdminChangeDateComponent } from './Pages/Admin/admin-change-date/admin-change-date.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminTicketActionComponent } from './Pages/Admin/admin-ticket-action/admin-ticket-action.component';
import { AdminTicketReplyComponent } from './Pages/Admin/admin-ticket-reply/admin-ticket-reply.component';
import { AdminTicketCloseComponent } from './Pages/Admin/admin-ticket-close/admin-ticket-close.component';
import { AdminTicketAddNoteComponent } from './Pages/Admin/admin-ticket-add-note/admin-ticket-add-note.component';
import { AdminTicketForwardComponent } from './Pages/Admin/admin-ticket-forward/admin-ticket-forward.component';
import { SettingBranchComponent } from './Pages/Admin/Settings/setting-branch/setting-branch.component';
import { SettingDepartmentComponent } from './Pages/Admin/Settings/setting-department/setting-department.component';
import { ReportHomeComponent } from './Pages/Admin/Reports/report-home/report-home.component';
import {NgxPrintModule} from 'ngx-print';
import { SettingStaffComponent } from './Pages/Admin/Settings/setting-staff/setting-staff.component';
export function tokenGetter() { 
    return localStorage.getItem("jwt"); 
  }
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#ffffff",
  bgsPosition: POSITION.centerCenter,
  bgsSize: 50,
  bgsType: SPINNER.circle, // background spinner type
  fgsType: SPINNER.fadingCircle, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  text:'Loading...',
  textPosition:'center-center',gap:3,
};
@NgModule({
  declarations: [
    AppComponent,
    EmpListComponent,
    EmpAddNewComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AgentHomeComponent,
    AgentNewTicketComponent,
    AgentMyTicketComponent,
    AgentDetailsTicketComponent,AdminHomeComponent, AdminDashboardComponent,AdminChangeDateComponent, AdminTicketActionComponent, AdminTicketReplyComponent, AdminTicketCloseComponent, AdminTicketAddNoteComponent, AdminTicketForwardComponent, SettingBranchComponent, SettingDepartmentComponent, ReportHomeComponent, SettingStaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,MaterialsModule,HttpClientModule,ReactiveFormsModule,FormsModule,
    DataTablesModule,NgxUiLoaderHttpModule,
     NgxUiLoaderRouterModule, NgxUiLoaderModule,
    ToastrModule.forRoot({progressBar:true,
      progressAnimation:'increasing',easing:'ease-in',timeOut:3000}),
      SweetAlert2Module.forRoot(),
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [],
          disallowedRoutes: []
        }
      }),
      CKEditorModule,NgSelectModule, NgxScrollTopModule,Ng2SearchPipeModule,NgxPrintModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
