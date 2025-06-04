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
      routeLink: 'managePersonnel',
      label: 'Manage Personnel'
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
      routeLink: 'addPersonnel',
      label: 'Add new Personnel'
    },
    {
      type : 'link',
      routeLink: 'addResource',
      label: 'Add new Resource'
    },

  ]
}
