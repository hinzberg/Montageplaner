import {Component, OnInit, OnDestroy} from '@angular/core';
import {PersonnelService} from '../../core/services/personnel.service';
import {Person} from '../../core/models/person.model';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-people',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, ToolbarComponent],
  templateUrl: './manage-people.component.html',
  styleUrl: './manage-people.component.scss'
})
export class ManagePeopleComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  private subscription: Subscription = new Subscription();

  // Dialog state
  showConfirmDialog = false;
  personToDelete: Person | null = null;
  dialogTitle = 'Delete Staff';
  dialogMessage = '';

  constructor(private router: Router, private personnelService: PersonnelService) {
  }

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

  toggleSelection(person: Person): void {
    person.isSelected = !person.isSelected;
    // Update the person selection in the service to persist the change
    this.personnelService.updatePerson(person);
  }

  newPerson(): void {
    this.router.navigate(['/addPeople']);
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
