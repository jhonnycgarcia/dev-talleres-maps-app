import { AfterViewInit, Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';



@Component({
  selector: 'maps-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1Ijoiamhvbm55Y2dhcmNpYSIsImEiOiJjbTJlMjNjMGgwMHI2MnJuNW5zdTNsOTg4In0.li0cuv5hqogIjDUnuqFq2Q',
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
