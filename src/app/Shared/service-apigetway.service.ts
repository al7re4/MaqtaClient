import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ServiceAPIGetwayService {
  _ip: string = ''
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  Get(ctr: string): Observable<any> {
    return this.http.get<any>(this._ip + ctr)

  }

  Delete(ctr: string) {
    return this.http.delete(this._ip + ctr)
  }

  Post(ctr: string, frm: any): Observable<any> {
    return this.http.post<any>(this._ip + ctr, frm)
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
}
