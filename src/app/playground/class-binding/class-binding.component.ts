import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-class-binding',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './class-binding.component.html',
  styleUrl: './class-binding.component.scss'
})
export class ClassBindingComponent {
  isImportant = false;
  isUnderlined = false;

  toggleImportant() {
    this.isImportant = !this.isImportant;
  }

  toggleUnderlined() {
    this.isUnderlined = !this.isUnderlined;
  }
}
