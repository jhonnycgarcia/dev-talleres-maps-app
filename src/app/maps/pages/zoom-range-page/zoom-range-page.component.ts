import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'maps-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit {


  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap) { throw new Error('divMap is not defined'); }
    const map = new Map({
      accessToken: environment.mapboxKey,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
