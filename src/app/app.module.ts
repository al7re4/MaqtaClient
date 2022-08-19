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
@NgModule({
  declarations: [
    AppComponent,
    EmpListComponent,
    EmpAddNewComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,MaterialsModule,HttpClientModule,ReactiveFormsModule,FormsModule,
    ToastrModule.forRoot(),DataTablesModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
