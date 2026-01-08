import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationSidebarComponent} from "./Components/navigation-sidebar/navigation-sidebar.component";
import { InspectorComponent} from "./Components/inspector/inspector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InspectorComponent , NavigationSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Assembly Planning';
}
