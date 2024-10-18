import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  router: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { name: 'Full Screen', router: '/maps/fullscreen' },
    { name: 'Zoom Range', router: '/maps/zoom-range' },
    { name: 'Markers', router: '/maps/markers' },
    { name: 'Properties', router: '/maps/properties' }
  ]

}
