import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, DoCheck, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval, map } from 'rxjs';
import { LatLng, Marker, icon, latLng, marker, tileLayer } from 'leaflet';
import { IMarker } from './imarker';
import { MarkerMetaData } from './marker-meta-data';
import { HtmlMarkerComponent } from './html-marker/html-marker.component';
import { FormsModule, NgForm } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, LeafletModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    zoom: 5,
    center: latLng(26.709879, 28.260116)
  };

  MARKERS_DATA: IMarker[] = [];
  markers: MarkerMetaData[] = [];
  map: any;
  latlang!: LatLng;
  constructor(
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
  ) { }
  ngOnInit(): void {
    const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
    const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
  }
  addMarker(form: NgForm) {
    this.MARKERS_DATA.push(
      {
        name: form.value.name,
        description: form.value.description,
        position: [+form.value.latitude, +form.value.longitude],
        city: form.value.city,
        district: form.value.district,
      }
    );

    this.latlang = latLng(+form.value.latitude, +form.value.longitude);

    const index = this.MARKERS_DATA.length - 1;

    const factory = this.resolver.resolveComponentFactory(HtmlMarkerComponent);

    const component = this.vcr.createComponent(factory);
    component.instance.data = this.MARKERS_DATA[index];


    component.changeDetectorRef.detectChanges();

    const m = marker(this.MARKERS_DATA[index].position);

    m.bindPopup(component.location.nativeElement).openPopup();

    m.addTo(this.map);

    this.markers.push({
      name: this.MARKERS_DATA[index].name,
      markerInstance: m,
      componentInstance: component
    });

  }
  removeMarker(_marker: any) {
    const idx = this.markers.indexOf(_marker);
    this.markers.splice(idx, 1);
    this.MARKERS_DATA.splice(idx, 1);
    _marker.markerInstance.removeFrom(this.map);
    _marker.componentInstance.destroy();
  }
}


