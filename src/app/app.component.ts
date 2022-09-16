import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceAPIGetwayService } from './Shared/service-apigetway.service';
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  sidebar = true;
  userid: any
  constructor(public service: ServiceAPIGetwayService,
    private config: NgSelectConfig) {
    this.config.notFoundText = 'no data found';
    this.config.appendTo = 'body';
    this.config.loadingText='Loading Data ...';
    this.config.bindValue = 'value';
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkuserid();
  }

  ClickToggle() {
    this.sidebar = !this.sidebar;
  }

  checkuserid() {
    this.userid = Number(sessionStorage.getItem('userid'))
    if (this.userid > 0) {
      this.service.isLogin = true;
    }
  }

}
