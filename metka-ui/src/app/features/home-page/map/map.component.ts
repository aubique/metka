import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from '../../../core/services/facade.service';
import { BehaviorSubject } from 'rxjs';
import { Marker } from '../../../core/model/marker';
import { MarkerMock } from '../../../shared/constants/MarkerMock';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  readonly DRAGGABLE = true;

  readonly marker: BehaviorSubject<Marker>;
  latMock: number;
  lngMock: number;

  constructor(private facade: FacadeService) {
    this.marker = this.facade.defaultMarker$;
    this.latMock = MarkerMock.lat;
    this.lngMock = MarkerMock.lng;
  }

  ngOnInit(): void {
    this.facade.openMap();
  }

  ngOnDestroy(): void {
    this.facade.closeMap();
  }

  onDragEnd(marker: BehaviorSubject<Marker>, $event: google.maps.MouseEvent): void {
    // console.log('onDragEnd', marker, #event);
    const latNew = $event.latLng.lat();
    const lngNew = $event.latLng.lng();

    this.facade.updateMarker(latNew, lngNew);
  }
}
