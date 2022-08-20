import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceAPIGetwayService } from './Shared/service-apigetway.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  constructor(public getWay:ServiceAPIGetwayService){}

 
}
