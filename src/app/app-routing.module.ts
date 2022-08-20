import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmpAddNewComponent } from './Pages/emp-add-new/emp-add-new.component';
import { EmpListComponent } from './Pages/emp-list/emp-list.component';
import { AuthGuard } from './Shared/auth.guard';

const routes: Routes = [
  {
    path: 'Emp', title: 'Employee', canActivate: [AuthGuard],
    children: [
      { path: 'Home', component: EmpListComponent },
      { path: 'Add', component: EmpAddNewComponent }
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
