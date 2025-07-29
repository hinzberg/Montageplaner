import { Component } from '@angular/core';
import {PersonService} from '../../core/services/person.service';
import {CommonModule} from '@angular/common';

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
}
