import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './Pages/Admin/admin-home/admin-home.component';
import { ReportHomeComponent } from './Pages/Admin/Reports/report-home/report-home.component';
import { SettingBranchComponent } from './Pages/Admin/Settings/setting-branch/setting-branch.component';
import { SettingDepartmentComponent } from './Pages/Admin/Settings/setting-department/setting-department.component';
import { SettingStaffComponent } from './Pages/Admin/Settings/setting-staff/setting-staff.component';
import { AgentHomeComponent } from './Pages/Agent/agent-home/agent-home.component';
import { AgentMyTicketComponent } from './Pages/Agent/agent-my-ticket/agent-my-ticket.component';
import { AgentNewTicketComponent } from './Pages/Agent/agent-new-ticket/agent-new-ticket.component';
import { AuthGuard } from './Shared/auth.guard';

const routes: Routes = [
  {
    path: 'Admin', title: 'CPanel', canActivate: [AuthGuard],
    children: [
      { path: 'Home', component: AdminHomeComponent },
      {
        path: 'Settings', title: 'Settings', children: [
          { path: 'Branch', component: SettingBranchComponent },
          { path: 'Department', component: SettingDepartmentComponent },
          { path: 'Staff', component: SettingStaffComponent },
        ]
      },
      {
        path: 'Reports', title: 'Settings', children: [
          { path: 'Home', component: ReportHomeComponent },
        ]
      },
    ]
  },
  {
    path: 'Agent', title: 'Agent', canActivate: [AuthGuard],
    children: [
      { path: 'Home', component: AgentHomeComponent },
      { path: 'NewTicket', component: AgentNewTicketComponent },
      { path: 'MyTicket', component: AgentMyTicketComponent },
    ]
  },

  { path: 'Login', component: LoginComponent },
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
