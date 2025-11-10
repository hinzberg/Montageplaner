import { Component } from '@angular/core';

@Component({
  selector: 'app-style-binding',
  standalone: true,
  imports: [],
  templateUrl: './style-binding.component.html',
  styleUrl: './style-binding.component.scss'
})
export class StyleBindingComponent {
  isImportant = false;
  isUnderlined = false;

  toggleImportant() {
    this.isImportant = !this.isImportant;
  }

  toggleUnderlined() {
    this.isUnderlined = !this.isUnderlined;
  }
}
