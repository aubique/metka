import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Marker } from '../model/marker';
import { InfoApi } from '../model/info-api';
import { MarkerMock } from '../../shared/constants/marker-mock';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  public markerCurrent$ = new BehaviorSubject<Marker>(MarkerMock);
  public dateCurrent$ = new BehaviorSubject<Date>(new Date());
  public groupSelected$ = new BehaviorSubject<number>(1);
  public listOfMarkers$ = new BehaviorSubject<Array<Marker>>([MarkerMock]);
  public infoRetrieved$ = new Subject<InfoApi>();
  public geolocationAllowed$ = new BehaviorSubject<boolean>(false);
  public zoomValue$ = new BehaviorSubject<number>(14);

  public infoApi: InfoApi | undefined;

  public markerSub = new Subscription();

  constructor() {
  }
}
