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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,MaterialsModule,HttpClientModule,ReactiveFormsModule,FormsModule,
    DataTablesModule,
     NgxUiLoaderRouterModule, NgxUiLoaderModule,
    ToastrModule.forRoot({progressBar:true,
      progressAnimation:'increasing',easing:'ease-in',timeOut:1000}),
      SweetAlert2Module.forRoot(),
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost/Employee"],
          disallowedRoutes: []
        }
      }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
