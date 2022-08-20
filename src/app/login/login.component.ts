import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceAPIGetwayService } from '../Shared/service-apigetway.service';

export interface AuthenticatedResponse {
  token: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmlogin = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  invalidLogin: boolean = false;
  _msg: string = '';
  hastoken = false;
 
  constructor(private getWay: ServiceAPIGetwayService,
    private router: Router, private _http: HttpClient) { }

  ngOnInit(): void {
  
  }
  submit() {

    this._http.post<AuthenticatedResponse>(this.getWay._ip + 'Auth/Login', this.frmlogin.value, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe({
        next: (res: AuthenticatedResponse) => {
          const token = res.token;
          if (!res.token) {
            this._msg = 'Access Denied...'
          }
          localStorage.setItem("jwt", token);
          this.getWay.isUserAuthenticated();
          this.router.navigate(["/Emp/Home"]);

        },
        error: (err: HttpErrorResponse) => { this.getWay.isUserAuthenticated() }
      })


  }
}
