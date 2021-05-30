import { StudGroup } from './stud-group';
import { Marker } from './marker';

export interface InfoApi {

  initialMarker: Marker;
  groupList: Array<StudGroup>;
}
