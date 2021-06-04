import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../services/store.service';
import { BaseSubService } from './base-sub-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubService extends BaseSubService {

  constructor(
    api: ApiService,
    store: StoreService,
  ) {
    super(api, store);
  }

  public onMarkerGetRequest(): void {
    // this.markerGetRequestSubscription = this.api.doGetDefaultMarker()
    //   .subscribe((markerFetched) => {
    //     this.store.markerCurrent$.next(markerFetched);
    // });
  }

  public onInfoGetRequest(): void {
    this.infoApiGetRequestSub = this.api.fetchInfoApi()
      .pipe(
        map((fetchInfoApi) => {
          // Make initial marker "draggable"
          fetchInfoApi.initialMarker.draggable = true;
          return fetchInfoApi;
        }),
      ).subscribe((infoApiFetched) => {
        // console.log('onInfoGetRequest() TRIGGERED');
        // console.log(infoApiFetched);
        this.store.infoRetrieved$.next(infoApiFetched);
        // this.store.groupList$.next(infoApiFetched.groupList);//TODO.w whether should be used or not for home-page
        this.store.markerCurrent$.next(infoApiFetched.initialMarker);
      });
  }

  public onMarkerListGetRequest(): void {
    this.markerListGetRequestSub = this.api.fetchMarkerListByGroup()
      .pipe(
        map((markers) => {
          // Make each marker "undraggable"
          markers.forEach((m) => {
            m.draggable = false;
          });
          return markers;
        }),
      ).subscribe((fetchedMarkers) => {
        // console.log('onMarkerListGetRequest() - TRIGGERED');
        // console.log(fetchedMarkers);
        this.store.listOfMarkers$.next(fetchedMarkers);
      });
  }
}
