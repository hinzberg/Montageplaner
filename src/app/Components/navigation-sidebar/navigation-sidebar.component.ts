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
      routeLink: 'manageStaff',
      label: 'Manage Staff'
    },
    {
      type : 'link',
      routeLink: 'manageResources',
      label: 'Manage Resources'
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
      routeLink: 'addStaff',
      label: 'Add new Staff'
    },
    {
      type : 'link',
      routeLink: 'addResource',
      label: 'Add new Resource'
    },

  ]
}
