import { Component, Input } from '@angular/core';
import { Person } from "../../models/person.model";

@Component({
  selector: 'app-list-child',
  standalone: true,
  imports: [],
  templateUrl: './list-child.component.html',
  styleUrl: './list-child.component.scss'
})
export class ListChildComponent {
  @Input() personIn!: Person;
}
