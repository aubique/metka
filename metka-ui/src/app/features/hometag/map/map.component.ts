import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from '../../../core/services/facade.service';
import { BehaviorSubject } from 'rxjs';
import { Marker } from '../../../core/model/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  marker: BehaviorSubject<Marker>;

  constructor(private facade: FacadeService) {
    this.marker = this.facade.defaultMarker$;
  }

  ngOnInit(): void {
    this.facade.openMap();
  }

  ngOnDestroy(): void {
    this.facade.closeMap();
  }
}
