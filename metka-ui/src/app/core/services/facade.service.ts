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

  get marker$(): BehaviorSubject<Marker> {
    return this.store.markerCurrent$;
  }

  get date$(): BehaviorSubject<Date> {
    return this.store.dateCurrent$;
  }

  get group$(): BehaviorSubject<any> {
    return this.store.groupSelected$;
  }

  public updateGroup(newSelect: any) {//FIXME define select
    this.store.groupSelected$.next(newSelect);
  }

  public openMap(): void {
    this.service.loadMarker();
  }

  public closeMap(): void {
    this.service.unloadMarker();
  }

  public updateMarker(latNew: number, lngNew: number, dateNew?: Date): void {
    this.service.pushMarkerToStore(latNew, lngNew, dateNew);
  }

  public confirmStepper(): void {
    this.service.postNewMarkerToApi();
  }
}
