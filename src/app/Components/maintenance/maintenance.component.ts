import { Component } from '@angular/core';
import {PersonnelService} from '../../core/services/personnel.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {

  constructor(private personnelService: PersonnelService) {
  }

  onClearAllClicked() {
    this.personnelService.clearPersons()
  }
}
