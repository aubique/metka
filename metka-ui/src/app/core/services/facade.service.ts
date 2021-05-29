import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Marker } from '../model/marker';
import { MarkerService } from './marker.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {

  constructor(
    private store: StoreService,
    private api: ApiService,
    private service: MarkerService,
  ) {
  }

  get defaultMarker$(): BehaviorSubject<Marker> {
    return this.store.defaultMarker$;
  }

  public openMap(): void {
    this.service.loadMarker();
  }

  public closeMap(): void {
    this.service.unloadMarker();
  }
}
