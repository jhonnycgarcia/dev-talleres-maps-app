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

  public zoom: number = 9;
  public map?: Map;

  ngAfterViewInit(): void {
    if(!this.divMap) { throw new Error('divMap is not defined'); }
    this.map = new Map({
      accessToken: environment.mapboxKey,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListener();
  }

  mapListener(): void {
    if(!this.map) { throw new Error('map is not defined'); }

    this.map.on('zoom', (e) => {
      // this.zoom = this.map!.getZoom();
      this.zoom = e.target.getZoom();
    });

    this.map.on('zoomend', (e) => {
      if(this.map!.getZoom() < 18) { return; }
      this.map!.zoomTo(18);
    });
  }

  zoomIn(): void {
    if(!this.map) { throw new Error('map is not defined'); }
    this.map.zoomIn();
  }

  zoomOut(): void {
    if(!this.map) { throw new Error('map is not defined'); }
    this.map.zoomOut();
  }

  zoomChanged(value: string): void {
    if(!this.map) { throw new Error('map is not defined'); }
    this.zoom = Number(value);
    this.map.setZoom(this.zoom);
  }

}
