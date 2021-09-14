import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { Marker } from '../model/marker';
import { FactoryHelper } from '../../shared/util/factory-helper';
import { DtoMarker } from '../model/dto-marker';
import { DatePipe } from '@angular/common';

interface cb {
  (): void;
}

@Injectable({
  providedIn: 'root',
})
export class MarkerService {

  private static readonly MARKER_LC_NAME = 'metka';
  private static readonly ZOOM_LC_NAME = 'zoom';
  private static readonly DATE_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
  public GPS = () => this._pullMarkerFromNavigator();
  public LC = () => this._pullMarkerFromLocalStorage();

  // MariaDB = '2020-12-31 23:59:59.000000';

  constructor(
    private store: StoreService,
    private api: ApiService,
    private _datePipe: DatePipe,
  ) {
  }

  // Push to Store from NavigatorGeolocation or LocalStorage
  public loadMarkerFrom(markerSources: cb[]) {
    markerSources.forEach((doPush) => doPush());
  }

  // Retrieve new GPS coordinates from browser
  private _pullMarkerFromNavigator(): void {
    const navMarker = {draggable: true} as Marker;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        navMarker!.lat = position.coords.latitude;
        navMarker!.lng = position.coords.longitude;

        this.store.markerCurrent$.next(navMarker);
        this.store.geolocationAllowed$.next(true);

        console.log(navMarker);
      }, (msg) => {
        // Error
        if (msg.code === msg.PERMISSION_DENIED) {
          this.store.geolocationAllowed$.next(false);
        }
        console.log(msg.message);
      });
    }
  }

  // Retrieve Marker from LocalStorage if exists
  private _pullMarkerFromLocalStorage(): void {
    const item: string | null = localStorage.getItem(MarkerService.MARKER_LC_NAME);
    const isGeolocationDenied = !(this.store.geolocationAllowed$.getValue());

    if (item && isGeolocationDenied) {
      this.store.markerCurrent$.next(JSON.parse(item) as Marker);
    }
  }

  // Push new coords as Marker to the StoreService and LocalStorage
  public storeNewMarker(lat: number, lng: number, date?: Date): void {
    const marker = {draggable: true, lat, lng, date} as Marker;

    this.store.markerCurrent$.next(marker);

    localStorage.setItem(MarkerService.MARKER_LC_NAME, JSON.stringify(marker));
  }

  // Push new Zoom value from LocalStorage to Store
  public pullZoomFromLocalStorage(): void {
    const item: string | null = localStorage.getItem(MarkerService.ZOOM_LC_NAME);

    if (item) {
      this.store.zoomValue$.next(JSON.parse(item) as number);
    }
  }

  // Push new zoom value to the LocalStorage
  public storeNewZoomValue(zoom: number) {
    localStorage.setItem(MarkerService.ZOOM_LC_NAME, JSON.stringify(zoom));
  }

  // Compose DtoMarker to do POST request
  public postDtoMarker(): void {
    const groupIdFromStore = this.store.groupSelected$.getValue() as number;
    const markerFromStore = this.store.markerCurrent$.getValue() as Marker;
    const dateFromStore = this.store.dateCurrent$.getValue() as Date;
    const pipedDate = this._convertDate(dateFromStore);

    const dtoMarker = FactoryHelper.newDtoMarker(markerFromStore, pipedDate) as DtoMarker;
    this.api.doPostRequest(groupIdFromStore, dtoMarker);
  }

  private _convertDate(dateToTransform: Date): string | null {
    return this._datePipe.transform(dateToTransform, MarkerService.DATE_FORMAT);
  }
}
