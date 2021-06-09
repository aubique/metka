import { Component, OnInit } from '@angular/core';
import { FacadeService } from './core/services/facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'metka-ui';

  constructor(private _facade: FacadeService) {
  }

  ngOnInit(): void {
    // Initialize the subscriptions to do GET reqs
    this._facade.bindInfoApi();
  }
}
