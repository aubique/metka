import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { Subscription } from 'rxjs';
import { Marker } from '../model/marker';
import { FactoryHelper } from '../../shared/util/factory-helper';

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

  public loadMarker(): void {
    this.store.markerSub = this.subscribeMarkerFromApiToStore();
    this.pushMarkerFromLcToStore();
  }

  public unloadMarker(): void {
    this.store.markerSub.unsubscribe();
  }

  private pushMarkerFromLcToStore(): void {
    const item: string | null = localStorage.getItem(this.MARKER_LC_NAME);

    // Push to the store if LC-item exists
    if (item) {
      this.store.markerCurrent$.next(JSON.parse(item) as Marker);
    }
  }

  private subscribeMarkerFromApiToStore(): Subscription {
    return this.api.doGetDefaultMarker().subscribe(marker => {
      this.store.markerCurrent$.next(marker);
    });
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
