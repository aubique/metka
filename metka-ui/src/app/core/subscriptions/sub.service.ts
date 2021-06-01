import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../services/store.service';
import { BaseSubService } from './base-sub-service';

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
    this.markerGetRequestSubscription = this.api.doGetDefaultMarker()
      .subscribe((markerFetched) => {
        this.store.markerCurrent$.next(markerFetched);
      });
  }

  public onInfoGetRequest(): void {
    this.infoApiGetRequestSub = this.api.fetchInfoApi()
      .subscribe((infoApiFetched) => {
        // console.log('onInfoGetRequest TRIGGERED');
        // console.log(infoApiFetched);

        this.store.infoRetrieved$.next(infoApiFetched);
        // this.store.groupList$.next(infoApiFetched.groupList);//TODO.w whether should be used or not for home-page
        this.store.markerCurrent$.next(infoApiFetched.initialMarker);
      });
  }
}
