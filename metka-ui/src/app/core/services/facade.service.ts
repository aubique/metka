import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marker } from '../model/marker';
import { MarkerService } from './marker.service';
import { InfoApi } from '../model/info-api';
import { SubService } from '../subscriptions/sub.service';
import { UnsubService } from '../subscriptions/unsub.service';
import { DtoMarker } from '../model/dto-marker';

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

  get markerList$(): Observable<Array<DtoMarker>> {
    return this._store.listOfMarkers$.asObservable();
  }

  get date$(): Observable<Date> {
    return this._store.dateCurrent$.asObservable();
  }

  get group$(): BehaviorSubject<any> {
    return this._store.groupSelected$;
  }

  public updateGroup(selectedId: number) {//
    this._store.groupSelected$.next(selectedId);
  }

  public updateDate(date: Date): void {
    this._store.dateCurrent$.next(date);
  }

  public bindInfoApi(): void {
    this._subscribe.onInfoGetRequest();
    this._service.loadMarkerFromLc();
  }

  public unbindInfoApi(): void {
    this._unsubscribe.onInfoGetRequest();
  }

  public bindMarkerList(groupId: number): void {
    this._subscribe.onMarkerListGetRequest(groupId);
  }

  public unbindMarkerList(): void {
    console.log(this._unsubscribe.markerListGetRequestSubs);
    this._unsubscribe.onMarkerListGetRequest();
  }

  public moveMarkerOnTheMap(latNew: number, lngNew: number, dateNew?: Date): void {
    this._service.storeNewMarker(latNew, lngNew, dateNew);
  }

  public updateSelectedMarker(newMarker: Marker): void {
    this._store.markerCurrent$.next(newMarker);
  }

  public confirmStepper(): void {
    this._service.postDtoMarker();
  }
}
