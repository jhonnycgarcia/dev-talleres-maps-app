import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  router: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { name: 'Full Screen', router: '/maps/fullscreen' },
    { name: 'Zoom Range', router: '/maps/zoom-range' },
    { name: 'Markers', router: '/maps/markers' },
    { name: 'Properties', router: '/maps/properties' },
    { name: 'Alone', router: '/alone' }
  ]

}
