import { Component } from '@angular/core';
import {PersonService} from '../../core/services/person.service';
import {CommonModule} from '@angular/common';
import {RandomPersonGenerator} from "../../shared/utils/random-person-generator";

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {

  constructor(private personnelService: PersonService) {
  }

  onClearAllClicked() {
    this.personnelService.clearItems()
  }

  onAddRandomPeopleClicked() {
    const generator = new RandomPersonGenerator();
    const people = generator.generatePeople(15);
    people.forEach(person => this.personnelService.addItem(person));
  }
}
