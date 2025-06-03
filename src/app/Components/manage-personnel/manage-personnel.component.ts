import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonnelService } from '../../core/services/personnel.service';
import { Person } from '../../core/models/person.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-manage-personnel',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, ToolbarComponent],
  templateUrl: './manage-personnel.component.html',
  styleUrl: './manage-personnel.component.scss'
})
export class ManagePersonnelComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  private subscription: Subscription = new Subscription();

  // Dialog state
  showConfirmDialog = false;
  personToDelete: Person | null = null;
  dialogTitle = 'Delete Personnel';
  dialogMessage = '';

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

  deletePerson(person: Person): void {
    this.personToDelete = person;
    this.dialogMessage = `Are you sure you want to delete <strong>${person.firstName} ${person.lastName}</strong>?`;
    this.showConfirmDialog = true;
  }

  onConfirmDelete(): void {
    if (this.personToDelete) {
      this.personnelService.removePerson(this.personToDelete.id);
      this.personToDelete = null;
    }
  }

  onCancelDelete(): void {
    this.personToDelete = null;
    this.showConfirmDialog = false;
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
  }
}
