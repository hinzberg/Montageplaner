import { Component } from '@angular/core';
import {RouterLinkActive} from "@angular/router";
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-playground-main',
  standalone: true,
  imports: [
    RouterLinkActive, RouterModule
  ],
  templateUrl: './playground-main.component.html',
  styleUrl: './playground-main.component.scss'
})
export class PlaygroundMainComponent {

}
