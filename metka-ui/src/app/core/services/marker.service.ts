import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { Marker } from '../model/marker';
import { FactoryHelper } from '../../shared/util/factory-helper';
import { DtoMarker } from '../model/dto-marker';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {

  private readonly MARKER_LC_NAME = 'marker';

  constructor(
    private store: StoreService,
    private api: ApiService,
  ) {
  }

  // Push to the StoreService if LC-item (marker) exists
  public loadMarkerFromLc(): void {
    const item: string | null = localStorage.getItem(this.MARKER_LC_NAME);

    if (item) {
      this.store.markerCurrent$.next(JSON.parse(item) as Marker);
    }
  }

  // Push new coords as Marker to the StoreService
  public storeNewMarker(lat: number, lng: number, date?: Date): void {
    const marker = {lat, lng, date} as Marker;

    this.store.markerCurrent$.next(marker);
  }

  // Compose DtoMarker to do POST request
  public postDtoMarker(): void {
    const groupIdFromStore = this.store.groupSelected$.getValue() as number;
    const markerFromStore = this.store.markerCurrent$.getValue() as Marker;
    const dateFromStore = this.store.dateCurrent$.getValue() as Date;
    const dtoMarker = FactoryHelper.newDtoMarker(markerFromStore, dateFromStore) as DtoMarker;

    this.api.doPostRequest(groupIdFromStore, dtoMarker);
  }
}
