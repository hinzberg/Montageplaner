import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-simple-signal',
  standalone: true,
  imports: [],
  templateUrl: './simple-signal.component.html',
  styleUrl: './simple-signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SimpleSignalComponent {
  id = signal(generateGuid());
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
  }

  decrement() {
    this.count.update(c => c - 1);
  }

  setNewId() {
    this.id.set(generateGuid());
  }
}

function generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
