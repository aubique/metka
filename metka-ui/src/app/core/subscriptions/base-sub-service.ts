import { ApiService } from '../services/api.service';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs';

export abstract class BaseSubService {

  protected markerGetRequestSubscription!: Subscription;
  protected infoApiGetRequestSub!: Subscription;

  protected constructor(
    protected api: ApiService,
    protected store: StoreService,
  ) {
  }

  abstract onMarkerGetRequest(): void;

  abstract onInfoGetRequest(): void;
}
