import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  template: `
    <!-- Variant 1: Property Binding -->
    <img [src]="imageUrl" [alt]="imageDescription" width="300">
    <p>Current Picture (Property Binding): {{ imageDescription }}</p>

    <!-- Variant 2: String Interpolation -->
    <img src="{{ imageUrl }}" alt="{{ imageDescription }}" width="300">
    <p>Current Picture (String Interpolation): {{ imageDescription }}</p>
  `,
  standalone: true,
  styles: [`
    img {
      display: block;
      width: 200px;
      height: 200px;
    }
  `]
})

export class PropertyBindingComponent {
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
  imageDescription = 'Angular Logo';
}
