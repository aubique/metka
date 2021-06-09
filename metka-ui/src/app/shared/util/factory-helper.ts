import { Marker } from '../../core/model/marker';
import { DtoMarker } from '../../core/model/dto-marker';

export class FactoryHelper {

  public static newDtoMarker(marker: Marker, dateIso: string | null): DtoMarker {
    const id = marker.id ?? 0;
    const lat = marker.lat;
    const lng = marker.lng;

    return {id: 0, lat, lng, mrkdate: dateIso} as DtoMarker;
    // return {id: 0, lat, lng} as DtoMarker;
  }
}
