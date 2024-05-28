import { Component, Input } from '@angular/core';
import { IMarker } from '../imarker';

@Component({
  selector: 'app-html-marker',
  standalone: true,
  imports: [],
  templateUrl: './html-marker.component.html',
  styleUrl: './html-marker.component.scss'
})
export class HtmlMarkerComponent {
  @Input() data!: IMarker;


}
