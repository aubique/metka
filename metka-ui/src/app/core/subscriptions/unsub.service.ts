import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BaseSubService } from './base-sub-service';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root',
})
export class UnsubService extends BaseSubService {

  constructor(
    api: ApiService,
    store: StoreService,
  ) {
    super(api, store);
  }

  public onMarkerGetRequest(): void {
    // this.markerGetRequestSubscription.unsubscribe();
  }

  public onInfoGetRequest(): void {
    // if (this.infoApiGetRequestSub != undefined) {
    //   this.infoApiGetRequestSub.unsubscribe();
    // }
  }

  public onMarkerListGetRequest(): void {
    console.log(this.markerListGetRequestSubs);
    // this.markerListGetRequestSubs.filter(s => (s != undefined))
    //   .forEach(s => s.unsubscribe());
  }
}
