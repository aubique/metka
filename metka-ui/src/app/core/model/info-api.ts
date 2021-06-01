import { StudGroup } from './stud-group';
import { Marker } from './marker';

export interface InfoApi {

  date: Date;
  initialMarker: Marker;
  groupList: Array<StudGroup>;
}
