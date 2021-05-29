import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Marker } from '../model/marker';
import { MarkerMock } from '../../shared/constants/MarkerMock';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  public defaultMarker$ = new BehaviorSubject<Marker>(MarkerMock);
  public markerSub = new Subscription();

  constructor() {
  }
}
