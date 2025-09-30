import { Component,  OnInit } from '@angular/core';
import { NgFor} from "@angular/common";
import { Person } from "../../models/person.model";
import { ListChildComponent } from "../list-child/list-child.component";

@Component({
  selector: 'app-list-parent',
  standalone: true,
  imports: [NgFor, ListChildComponent],
  templateUrl: './list-parent.component.html',
  styleUrl: './list-parent.component.scss'
})

export class ListParentComponent implements OnInit  {

  persons: Person[] = [];

  private firstnames: string[] = [
    'John', 'Jane', 'Lea', 'Mike', 'Anna', 'Chris',
    'Sophia', 'David', 'Emma', 'Daniel', 'Olivia', 'Lucas'
  ];

  private lastnames: string[] = [
    'Doe', 'Smith', 'Brown', 'Taylor', 'Wilson', 'Johnson',
    'Martinez', 'Lee', 'Garcia', 'Clark', 'Walker', 'Young'
  ];

  ngOnInit(): void {
    this.generateRandomPersons(12);
  }

  private generateRandomPersons(count: number): void {
    this.persons = Array.from({ length: count }, () => ({
      firstname: this.getRandomItem(this.firstnames),
      name: this.getRandomItem(this.lastnames),
    }));
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
