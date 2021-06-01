import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Marker } from '../model/marker';
import { MarkerMock } from '../../shared/constants/MarkerMock';
import { InfoApi } from '../model/info-api';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  public markerCurrent$ = new BehaviorSubject<Marker>(MarkerMock);
  public dateCurrent$ = new BehaviorSubject<Date>(new Date());
  public groupSelected$ = new BehaviorSubject<number>(1);
  public infoRetrieved$ = new Subject<InfoApi>();

  public infoApi: InfoApi | undefined;

  public markerSub = new Subscription();

  constructor() {
  }
}
