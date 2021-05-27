import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Marker} from "../model/Marker";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
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

  //FIXME: expand controller to work w/ groups
  private static getTestGroupIdUrl(): string {
    return '/api/group/1';
  }

  //FIXME naming
  private static getAllGroupsIdUrl(): string {
    return '/api/groups';
  }

  private static getMarkIdUrl(markToIdentify: Marker): string {
    return '/api/mark/'.concat(markToIdentify.id.toString());
  }

  public doGetRequest(): Observable<Array<Marker>> {
    return this.http.get<Array<Marker>>(ApiService.getAllGroupsIdUrl());
    //.get<Array<Marker>>('/assets/mock/get-request.json');
  }

  public doPostRequest(markToCreate: Marker): Observable<Marker> {
    return this.http.post<Marker>(ApiService.getTestGroupIdUrl(), markToCreate, this.httpOptions);
    //.get<Marker>('/assets/mock/put-request.json');
  }

  public doDeleteRequest(markToDelete: Marker): Observable<any> {
    return this.http.delete<void>(ApiService.getMarkIdUrl(markToDelete));
  }
}
