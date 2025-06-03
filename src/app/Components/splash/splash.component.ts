import { Component } from '@angular/core';
import { IconUserComponent } from '../../../shared/Icons/icon-user/icon-user.component';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [IconUserComponent],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent {

}
