import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  get info(): InfoApi | undefined {
    return this._store.infoApi;
  }

  get info$(): Observable<InfoApi> {
    return this._store.infoRetrieved$.asObservable();
  }

  get marker$(): Observable<Marker> {
    return this._store.markerCurrent$.asObservable();
  }

  get date$(): BehaviorSubject<Date> {
    return this._store.dateCurrent$;
  }

  get group$(): BehaviorSubject<any> {
    return this._store.groupSelected$;
  }

  public updateGroup(selectedId: number) {//
    this._store.groupSelected$.next(selectedId);
  }

  public openMap(): void {
    this._subscribe.onInfoGetRequest();
    this._service.loadMarkerFromLc();
  }

  public closeMap(): void {
    this._unsubscribe.onInfoGetRequest();
  }

  public updateMarkerWithCoords(latNew: number, lngNew: number, dateNew?: Date): void {
    this._service.storeNewMarker(latNew, lngNew, dateNew);
  }

  public confirmStepper(): void {
    this._service.postDtoMarker();
  }
}
