import { LatLngExpression } from "leaflet";

export interface IMarker {
    name: string;
    description: string;
    position: LatLngExpression;
    city: string;
    district: string;
}
