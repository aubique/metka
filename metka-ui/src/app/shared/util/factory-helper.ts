import { Marker } from '../../core/model/marker';
import { DtoMarker } from '../../core/model/dto-marker';

export class FactoryHelper {

  public static newDtoMarker(marker: Marker, date: Date): DtoMarker {
    const id = marker.id ?? 0;
    const lat = marker.lat;
    const lng = marker.lng;

    // return {id, lat, lng, date} as DtoMarker;
    return {id: 0, lat, lng} as DtoMarker;
  }
}
