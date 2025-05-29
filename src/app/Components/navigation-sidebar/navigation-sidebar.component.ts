import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navigation-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.scss',
})

export class NavigationSidebarComponent {

  items = [
    {
      routeLink: 'addPersonnel',
      label: 'Add new Personnel'
    },
    {
      routeLink: 'addResource',
      label: 'Add new Resource'
    },
    {
      routeLink: '',
      label: '-'
    },
    {
      routeLink: 'managePersonnel',
      label: 'Manage Personnel'
    },
    {
      routeLink: 'manageResources',
      label: 'Manage Resources'
    },
    {
      routeLink: '',
      label: '-'
    },
    {
      routeLink: 'plan',
      label: 'Plan'
    }
  ]
}
