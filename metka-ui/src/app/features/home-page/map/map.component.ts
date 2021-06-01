import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from '../../../core/services/facade.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marker } from '../../../core/model/marker';
import { MarkerMock } from '../../../shared/constants/MarkerMock';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  readonly DRAGGABLE = true;
  readonly LAT_DEFAULT = MarkerMock.lat;
  readonly LNG_DEFAULT = MarkerMock.lng;

  readonly marker: Observable<Marker>;

  constructor(private _facade: FacadeService) {
    this.marker = this._facade.marker$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onDragEnd($event: google.maps.MouseEvent): void {
    // console.log('onDragEnd', initialMarker, #event);
    const latNew = $event.latLng.lat();
    const lngNew = $event.latLng.lng();

    this._facade.updateMarkerWithCoords(latNew, lngNew);
  }
}
