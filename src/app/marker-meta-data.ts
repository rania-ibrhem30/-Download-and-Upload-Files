import { Marker } from "leaflet";
import { HtmlMarkerComponent } from "./html-marker/html-marker.component";
import { ComponentRef } from "@angular/core";

export interface MarkerMetaData {
    name: string;
    markerInstance: Marker;
    componentInstance: ComponentRef<HtmlMarkerComponent>;
}
