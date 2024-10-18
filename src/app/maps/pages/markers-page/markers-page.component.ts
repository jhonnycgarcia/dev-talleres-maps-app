import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'maps-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public lnglat: LngLat = new LngLat(-66.90260060005852, 10.483781022919501);

  ngAfterViewInit(): void {
    if(!this.divMap) { throw new Error('divMap is not defined'); }
    this.map = new Map({
      accessToken: environment.mapboxKey,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    // const marketHtml = document.createElement('div');
    // marketHtml.innerHTML = 'Jhonny García';

    // const marker = new Marker({
    //     color: 'red',
    //     // element: marketHtml,
    //   })
    //   .setLngLat(this.lnglat)
    //   .addTo(this.map);
  }

  createMarker(): void {
    if(!this.map) { throw new Error('map is not defined'); }
    const lngLat = this.map.getCenter();
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if(!this.map) { throw new Error('map is not defined'); }
    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }


}
