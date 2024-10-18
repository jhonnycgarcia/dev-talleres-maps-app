import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environments';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PLainMarker {
  lngLat: number[];
  color: string;
}

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
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if(!this.divMap) { throw new Error('divMap is not defined'); }
    this.map = new Map({
      accessToken: environment.mapboxKey,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.readFromLocalStorage();

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

    this.markers.push({ marker, color });
    this.saveToLocalStorage();
  }

  deleteMarker(i: number): void {
    this.markers[i].marker.remove();
    this.markers.splice(i, 1);
  }

  flyTo(marker: Marker): void {
    if(!this.map) { throw new Error('map is not defined'); }
    this.map.flyTo({
      center: marker.getLngLat(),
      zoom: 14
    });
  }

  saveToLocalStorage(): void {
    const plainMarkers: PLainMarker[] = this.markers.map(({marker, color}) => {
      return {
        lngLat: marker.getLngLat().toArray(),
        color
      };
    })
    localStorage.setItem('markers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(): void {
    const plainMarkers: PLainMarker[] = JSON.parse(localStorage.getItem('markers') || '[]');
    if(!Array.isArray(plainMarkers)) { return; }

    plainMarkers.forEach(({lngLat, color}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }


}
