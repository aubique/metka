import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { Marker } from '../model/marker';
import { FactoryHelper } from '../../shared/util/factory-helper';
import { DtoMarker } from '../model/dto-marker';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {

  private static readonly MARKER_LC_NAME = 'metka';
  private static readonly DATE_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';

  // MariaDB = '2020-12-31 23:59:59.000000';

  constructor(
    private store: StoreService,
    private api: ApiService,
    private _datePipe: DatePipe,
  ) {
  }

  // Push to the StoreService if LC-item (marker) exists
  public loadMarkerFromLc(): void {
    const item: string | null = localStorage.getItem(MarkerService.MARKER_LC_NAME);

    if (item) {
      this.store.markerCurrent$.next(JSON.parse(item) as Marker);
    }
  }

  // Push new coords as Marker to the StoreService and LocalStorage
  public storeNewMarker(lat: number, lng: number, date?: Date): void {
    const marker = {draggable: true, lat, lng, date} as Marker;

    this.store.markerCurrent$.next(marker);

    localStorage.setItem(MarkerService.MARKER_LC_NAME, JSON.stringify(marker));
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
