import { Marker } from '../../core/model/marker';

export class FactoryHelper {

  public static newMarker(marker: Marker, date: Date): Marker {
    const id = marker.id ?? 0;
    const lat = marker.lat;
    const lng = marker.lat;

    return {id, lat, lng, date} as Marker;
  }
}
