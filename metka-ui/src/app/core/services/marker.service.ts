import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { Marker } from '../model/marker';
import { FactoryHelper } from '../../shared/util/factory-helper';
import { SubService } from '../subscriptions/sub.service';
import { UnsubService } from '../subscriptions/unsub.service';

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

  // Push to the store if LC-item exists
  public loadMarkerFromLc(): void {
    const item: string | null = localStorage.getItem(this.MARKER_LC_NAME);

    if (item) {
      this.store.markerCurrent$.next(JSON.parse(item) as Marker);
    }
  }

  public pushMarkerToStore(lat: number, lng: number, date?: Date): void {
    const marker = {lat, lng, date} as Marker;
    this.store.markerCurrent$.next(marker);
  }

  public postNewMarkerToApi(): void {
    const markerFromStore = this.store.markerCurrent$.getValue() as Marker;
    const dateFromStore = this.store.dateCurrent$.getValue() as Date;

    const markerForApi = FactoryHelper.newMarker(markerFromStore, dateFromStore) as Marker;
    this.api.doPostRequest(markerForApi);
  }
}
