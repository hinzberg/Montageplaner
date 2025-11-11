import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEntry } from './ListEntry';

@Component({
  selector: 'app-array-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './array-sample.component.html',
  styleUrl: './array-sample.component.scss'
})
export class ArraySampleComponent {

  entries: ListEntry[] = [];

  addEntry(): void {
    const randomText = this.generateRandomText(20);
    const newEntry: ListEntry = {
      content: randomText,
      date: new Date()
    };
    this.entries.push(newEntry);
  }

  removeEntry(entry: ListEntry): void {
    let index = this.entries.indexOf(entry);
    this.entries.splice(index, 1);
  }

  private generateRandomText(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
