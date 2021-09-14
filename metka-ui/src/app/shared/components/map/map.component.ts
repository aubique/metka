import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from '../../../core/services/facade.service';
import { Observable } from 'rxjs';
import { Marker } from '../../../core/model/marker';
import { MarkerMock } from '../../constants/marker-mock';
import MapsEventListener = google.maps.MapsEventListener;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  // readonly DRAGGABLE = true;
  readonly LAT_DEFAULT = MarkerMock.lat;
  readonly LNG_DEFAULT = MarkerMock.lng;
  readonly MIN_ZOOM = 10;

  readonly marker: Observable<Marker>;
  readonly currZoom: Observable<number>;

  map?: google.maps.Map;
  mapClickListener?: MapsEventListener;

  constructor(private _facade: FacadeService, private zone: NgZone) {
    this.marker = this._facade.marker$;
    this.currZoom = this._facade.zoomValue$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }

  onDragEnd($event: google.maps.MouseEvent): void {
    const latNew = $event.latLng.lat();
    const lngNew = $event.latLng.lng();

    this._facade.moveMarkerOnTheMap(latNew, lngNew);
  }

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;

    // Workaround for bugged version of NG-AGM
    this.mapClickListener = this.map.addListener('click',
      (event: google.maps.MouseEvent) => {
        this.zone.run(() => {
          const latNew = event.latLng.lat();
          const lngNew = event.latLng.lng();

          this._facade.moveMarkerOnTheMap(latNew, lngNew);
          //console.log(e.latLng.lat(), e.latLng.lng());
        });
      });
  }

  onZoomChange(newZoomValue: number): void {
    this._facade.changeZoom(newZoomValue);
  }
}
