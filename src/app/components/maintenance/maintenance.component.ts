import { Component } from '@angular/core';
import {PersonService} from '../../core/services/person.service';
import {CommonModule} from '@angular/common';
import {RandomPersonGenerator} from "../../shared/utils/random-person-generator";
import {EquipmentService} from '../../core/services/equipment.service';
import {Equipment} from '../../core/models/equipment.model';
import {EquipmentType} from '../../core/models/equipment-type.enum';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {

  constructor(private personnelService: PersonService, private equipmentService: EquipmentService) {
  }

  onClearAllClicked() {
    this.personnelService.clearItems()
  }

  onAddRandomPeopleClicked() {
    const generator = new RandomPersonGenerator();
    const people = generator.generatePeople(15);
    people.forEach(person => this.personnelService.addItem(person));
  }

  onAddSampleEquipmentClicked() {
    const items = [
      new Equipment('Chainsaw', EquipmentType.HandHeld, true),
      new Equipment('Jackhammer', EquipmentType.HandHeld, true),
      new Equipment('Ladder', EquipmentType.HandHeld, true),
      new Equipment('Concrete Mixer', EquipmentType.SelfDriving, true),
      new Equipment('Crane', EquipmentType.SelfDriving, true),
      new Equipment('Excavator', EquipmentType.SelfDriving, true),
    ];
    items.forEach(item => this.equipmentService.addItem(item));
  }
}
