import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Marker } from '../model/marker';
import { MarkerMock } from '../../shared/constants/MarkerMock';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  public markerCurrent$ = new BehaviorSubject<Marker>(MarkerMock);
  public dateCurrent$ = new BehaviorSubject<Date>(new Date());
  public groupSelected$ = new BehaviorSubject(null);

  public markerSub = new Subscription();

  constructor() {
  }
}
