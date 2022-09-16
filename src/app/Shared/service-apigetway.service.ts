import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class ServiceAPIGetwayService {
  _ip: string = 'http://laptop/helpdesk/api/'
  _ipSignalR: string = '' // usied in signalR just replace 'api/'
  public http_options: any // usied for jwt 
  loginToken: any //usied for save user toke for using in signalR  
  isLogin = false;
  public userId: any
  private hubConnectionBuilder!: HubConnection;
  constructor(private http: HttpClient, private toastr: ToastrService,
    private jwtHelper: JwtHelperService) {
    this._ipSignalR = this._ip.replace('api/', '')
  }

  Get(ctr: string): Observable<any> {
    return this.http.get<any>(this._ip + ctr, this.http_options)

  }

  Delete(ctr: string) {
    return this.http.delete(this._ip + ctr, this.http_options)
  }

  Post(ctr: string, frm: any): Observable<any> {
    return this.http.post<any>(this._ip + ctr, frm, this.http_options)
  }
  showSuccess() {
    this.toastr.success('Process Successfuly', '');
  }
  showError(err: string) {
    this.toastr.error('Error in Process', err);
  }
  private _Listners = new Subject<any>();
  Listen(): Observable<any> {
    return this._Listners.asObservable();
  }

  filter(filterby: string) {
    return this._Listners.next(filterby);
  }

  //#region  Auth
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    let userid = Number(localStorage.getItem('userid'))
    this.userId = userid
    if (token && userid > 0) {
      const tokenHeader = new HttpHeaders({ "Authorization": `Bearer ${token}` });
      this.http_options = { headers: tokenHeader };
      this.loginToken = token
      return true;
    }
    return false;
  }
  //#endregion

  InitSignalR() {
    var role = localStorage.getItem('role')
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(this._ipSignalR + 'GetBroadCast', { accessTokenFactory: () => this.loginToken }).configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(() => console.log('Connection started.! ' + role)).catch(err => console.log('Error while connect with server'));
    this.hubConnectionBuilder.on('SendMessage', (result: any) => {
      if (result.message != 'Reply') {
        this.toastr.success(result.message, '');
        this.filter('filterDate')
        console.log('refrechAdmin')
      }
      else
      {
        this.filter('LoadTicket')
        
      }

      

    });
  }

}
