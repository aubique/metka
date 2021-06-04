import { StudGroup } from './stud-group';
import { Marker } from './marker';

export interface InfoApi {

  infoDate: Date;
  initialMarker: Marker;
  groupList: Array<StudGroup>;
}
