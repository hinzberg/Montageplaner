import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-playground-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './playground-main.component.html',
  styleUrl: './playground-main.component.scss'
})
export class PlaygroundMainComponent {
  playgroundLinks = [
    { link: '/playground-two-way', description: 'Two-Way-Binding' },
    { link: '/playground-pipes', description: 'Build-In Pipes' },
    { link: '/playground-custom-pipes', description: 'Custom Pipes' },
    { link: '/playground-class-binding', description: 'Class Binding' },
    { link: '/playground-style-binding', description: 'Style Binding' },
    { link: '/playground-array', description: 'Array' },
    { link: '/playground-simple-signal', description: 'Simple Signal' },
    { link: '/playground-event-binding', description: 'Event Binding' },
    { link: '/playground-country-service', description: 'Service' },
    { link: '/playground-list-parent', description: 'Simple List' },
    { link: '/playground-dialog-parent', description: 'Dialog Window Demo' }
  ];
}
