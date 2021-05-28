import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {

  constructor(
    private store: StoreService,
    private api: ApiService,
  ) {
  }
}
