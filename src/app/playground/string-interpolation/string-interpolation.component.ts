import { Component } from '@angular/core';

@Component({
  selector: 'app-string-interpolation',
  template: `
    <h1>{{ getGreeting() }}</h1>
    <p>Status: {{ isActive ? 'Online' : 'Offline' }}</p>
    <p>Age: {{ age }}</p>
    <p>In five years: {{ age + 5 }}</p>
  `,
  standalone: true,
  styles: [`
    h1 {
      color: #2c3e50;
      font-family: Arial, sans-serif;
    }

    p {
      font-size: 16px;
      margin: 4px 0;
    }
  `]
})

export class StringInterpolationComponent {
  username = 'Lea';
  age = 27;
  isActive = true;

  getGreeting(): string {
    return `Welcome back, ${this.username}!`;
  }
}
