import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WebheaderComponent } from './Components/webheader/webheader.component';
import { WebfooterComponent } from './Components/webfooter/webfooter.component';
import { NavigationSidebarComponent} from "./Components/navigation-sidebar/navigation-sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WebheaderComponent, WebfooterComponent , NavigationSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Assembly Planning';
}
