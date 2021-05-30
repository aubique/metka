import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marker } from '../model/marker';
import { MarkerService } from './marker.service';
import { InfoApi } from '../model/info-api';
import { SubService } from '../subscriptions/sub.service';
import { UnsubService } from '../subscriptions/unsub.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {

  constructor(
    private _store: StoreService,
    private _api: ApiService,
    private _service: MarkerService,
    private _subscribe: SubService,
    private _unsubscribe: UnsubService,
  ) {
  }

  get marker$(): BehaviorSubject<Marker> {
    return this._store.markerCurrent$;
  }

  get date$(): BehaviorSubject<Date> {
    return this._store.dateCurrent$;
  }

  get info(): InfoApi | undefined {
    return this._store.infoApi;
  }

  get group$(): Observable<any> {
    return this._store.groupSelected$.asObservable();
  }

  public updateGroup(newSelect: any) {//FIXME define select
    this._store.groupSelected$.next(newSelect);
  }

  public openMap(): void {
    this._subscribe.onInfoGetRequest();
    this._service.loadMarkerFromLc();
  }

  public closeMap(): void {
    this._subscribe.onInfoGetRequest();
  }

  public updateMarkerWithCoords(latNew: number, lngNew: number, dateNew?: Date): void {
    this._service.pushMarkerToStore(latNew, lngNew, dateNew);
  }

  public confirmStepper(): void {
    this._service.postNewMarkerToApi();
  }
}
