import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marker } from '../model/marker';
import { Observable } from 'rxjs';
import { InfoApi } from '../model/info-api';
import { DtoMarker } from '../model/dto-marker';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private static getInfoApiUrl(): string {
    return 'api/info';
  }

  //FIXME: expand controller to work w/ groupList
  private static getTestGroupIdUrl(): string {
    return '/api/group/1';
  }

  private static getGroupIdUrl(groupId: number) {
    return '/api/group/'.concat(groupId.toString());
  }

  //FIXME naming
  private static getAllGroupsIdUrl(): string {
    return '/api/groupList';
  }

  private static getMarkIdUrl(markerToIdentify: Marker): string {
    return '/api/initialMarker/'.concat(markerToIdentify.id?.toString() ?? '0');//FIXME: drop out DELETE method
  }

  public fetchFullMarkerList(): Observable<Array<Marker>> {
    return this.http
      .get<Array<Marker>>(ApiService.getAllGroupsIdUrl());
    //.get<Array<Marker>>('/assets/mock/get-request.json');
  }

  public fetchInfoApi(): Observable<InfoApi> {
    return this.http
      // .get<InfoApi>(ApiService.getInfoApiUrl());
      .get<InfoApi>('/assets/mock/default-info-api.json');
  }

  public doGetDefaultMarker(): Observable<Marker> {
    return this.http.get<Marker>('/assets/mock/default-initialMarker.json');
  }

  public doPostRequest(groupId: number, markerToCreate: DtoMarker): void {
    console.log('POST');
    console.log(ApiService.getGroupIdUrl(groupId));
    this.http
      .post<void>(ApiService.getGroupIdUrl(groupId), markerToCreate, this.httpOptions)
      .subscribe();
    //.get<Marker>('/assets/mock/put-request.json');
  }

  // public doPostRequest(markToCreate: Marker): Observable<Marker> {
  //   return this.http.post<Marker>(ApiService.getTestGroupIdUrl(), markToCreate, this.httpOptions);
  //   //.get<Marker>('/assets/mock/put-request.json');
  // }

  public doDeleteRequest(markToDelete: Marker): Observable<any> {
    return this.http.delete<void>(ApiService.getMarkIdUrl(markToDelete));
  }
}