import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebar = true;
  ClickToggle() {
    this.sidebar = !this.sidebar;
  }
}
