import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonnelService } from '../../core/services/personnel.service';
import { Person } from '../../core/models/person.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-personnel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-personnel.component.html',
  styleUrl: './manage-personnel.component.scss'
})
export class ManagePersonnelComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private personnelService: PersonnelService) {}

  ngOnInit(): void {
    // Get initial list of persons
    this.persons = this.personnelService.getPersons();

    // Subscribe to updates
    this.subscription.add(
      this.personnelService.personsUpdated.subscribe(persons => {
        this.persons = persons;
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
  }
}
