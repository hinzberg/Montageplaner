import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SidebarGroupComponent} from "./sidebar-group/sidebar-group.component";

@Component({
  selector: 'app-navigation-sidebar',
  standalone: true,
  imports: [RouterModule, SidebarGroupComponent],
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.scss',
})

export class NavigationSidebarComponent {

  items = [
    {
      type : 'link',
      routeLink: 'managePeople',
      label: 'People'
    },
    {
      type : 'link',
      routeLink: 'manageEquipment',
      label: 'Equipment'
    },
    {
      type : 'link',
      routeLink: 'plan',
      label: 'Plan'
    },
    {
      type : 'group',
      routeLink: '',
      label: 'Quick Links'
    },
    {
      type : 'link',
      routeLink: 'addPeople',
      label: 'New People'
    },
    {
      type : 'link',
      routeLink: 'addEquipment',
      label: 'New Equipment'
    },
    {
      type : 'group',
      routeLink: '',
      label: 'Development'
    },
    {
      type : 'link',
      routeLink: 'maintenance',
      label: 'Maintenance'
    },

  ]
}
