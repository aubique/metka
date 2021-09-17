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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessage } from '../../shared/constants/snack-bar-message';

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
    private _infoSnackBar: MatSnackBar,
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

  get isGeoDenied(): boolean {
    return !(this._store.geolocationAllowed$.getValue());
  }

  get zoomValue$(): Observable<number> {
    return this._store.zoomValue$;
  }

  public updateGroup(selectedId: number) {//
    this._store.groupSelected$.next(selectedId);
  }

  public updateDate(date: Date): void {
    this._store.dateCurrent$.next(date);
  }

  public bindInfoApi(): void {
    const {LC, GPS} = this._service;

    this._subscribe.onInfoGetRequest();
    this._service.loadMarkerFrom([LC, GPS]);
    this._service.pullZoomFromLocalStorage();
  }

  public updateGps(): void {
    this._service.loadMarkerFrom([this._service.GPS]);
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

  public changeZoom(newZoomValue: number): void {
    this._service.storeNewZoomValue(newZoomValue);
  }

  public moveMarkerOnTheMap(latNew: number, lngNew: number, dateNew?: Date): void {
    this._service.storeNewMarker(latNew, lngNew, dateNew);
  }

  public updateSelectedMarker(newMarker: Marker): void {
    this._store.markerCurrent$.next(newMarker);
  }

  public confirmStepper(): void {
    // this._service.postDtoMarker();
    this.showMessageSnackBar(SnackBarMessage.SESSION_OVER);
  }

  public showMessageSnackBar(message: string): void {
    this._infoSnackBar.open(message, 'OK');
  }
}
