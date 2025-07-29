import {Component, OnInit, OnDestroy} from '@angular/core';
import {PersonService} from '../../core/services/person.service';
import {Person} from '../../core/models/person.model';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {ConfirmOverlayDialogComponent} from '../shared/confirm-overlay-dialog/confirm-overlay-dialog.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-manage-people',
  standalone: true,
    imports: [CommonModule,ConfirmOverlayDialogComponent , ToolbarComponent, ReactiveFormsModule],
  templateUrl: './manage-people.component.html',
  styleUrl: './manage-people.component.scss'
})
export class ManagePeopleComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  private subscription: Subscription = new Subscription();

  // Dialog state
  showConfirmDialog = false;
  personToDelete: Person | null = null;
  dialogTitle = 'Delete Person';
  dialogMessage = '';

  constructor(private router: Router,
              private personService: PersonService) {

    // Initialize the personEditService to ensure it's ready for use
    this.personService.clearSelectedItem();
  }

  ngOnInit(): void {
    // Get initial list of persons
    this.persons = this.personService.getItems();

    // Subscribe to updates
    this.subscription.add(
      this.personService.itemsUpdated.subscribe(persons => {
        this.persons = persons;
      })
    );
  }

  toggleSelection(person: Person): void {
    person.isSelected = !person.isSelected;
    // Update the person selection in the service to persist the change
    this.personService.updateItem(person);
  }

  onNewPersonClicked(): void {
    this.router.navigate(['/addPeople']);
  }

  onDeletePersonClicked(person: Person): void {
    this.personToDelete = person;
    this.dialogMessage = `Are you sure you want to delete <strong>${person.firstName} ${person.lastName}</strong>?`;
    this.showConfirmDialog = true;
  }

  onEditPersonClicked(person: Person): void {
    this.personService.setSelectedItem(person);
    this.router.navigate(['/addPeople']);
  }

  onConfirmDelete(): void {
    if (this.personToDelete) {
      this.personService.removeItem(this.personToDelete.id);
      this.personToDelete = null;
    }
    this.showConfirmDialog = false;
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
