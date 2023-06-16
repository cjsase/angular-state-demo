import { Component } from '@angular/core';
import {AppService, Config} from "./app.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected config$: Observable<Config>
  constructor(private service: AppService) {
    this.config$ = this.service.getConfig$()
  }

  updateState1(event: Event) {
    this.service.updateConfig({state1: (event.target as HTMLInputElement).checked})
  }

  updateState2(event: Event) {
    this.service.updateConfig({state2: (event.target as HTMLInputElement).checked})
  }
}
