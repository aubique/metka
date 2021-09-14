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

  private static getGroupIdUrl(groupId: number) {
    return '/api/group/'.concat(groupId.toString());
  }

  //FIXME naming
  private static getAllGroupsIdUrl(): string {
    return '/api/groupList';
  }

  private static getMarkIdUrl(markerToIdentify: Marker): string {
    return '/api/initialMarker/'.concat(markerToIdentify.id?.toString() ?? '0');
  }

  public fetchMarkerListByGroup(groupId: number): Observable<Array<Marker>> {
    console.log('fetchMarkerListByGroup()');
    // const groupId = 1;
    return this.http
      .get<Array<Marker>>(ApiService.getGroupIdUrl(groupId));
    // .get<Array<Marker>>('/assets/mock/default-marker-list.json');
  }

  // public fetchFullMarkerList(): Observable<Array<Marker>> {
  //   return this.http
  //     .get<Array<Marker>>(ApiService.getAllGroupsIdUrl());
  //.get<Array<Marker>>('/assets/mock/get-request.json');
  // }

  public fetchInfoApi(): Observable<InfoApi> {
    return this.http
      .get<InfoApi>(ApiService.getInfoApiUrl());
    // .get<InfoApi>('/assets/mock/default-info-api.json');
  }

  public doPostRequest(groupId: number, markerToCreate: DtoMarker): void {
    // console.log('POST request : Marker');//FIXME.d.stdout
    // console.log(markerToCreate);
    this.http
      .post<void>(ApiService.getGroupIdUrl(groupId), markerToCreate, this.httpOptions)
      .subscribe();
    // .get<Marker>('/assets/mock/put-request.json');
  }

  // public doDeleteRequest(markToDelete: Marker): Observable<any> {
  //   return this.http.delete<void>(ApiService.getMarkIdUrl(markToDelete));
  // }
}
