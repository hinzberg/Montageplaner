import { Component, OnInit, signal, computed, WritableSignal, Signal } from '@angular/core';
import { PersonService } from '../../core/services/person.service';
import { Person } from '../../core/models/person.model';
import { CommonModule } from '@angular/common';
import { ConfirmOverlayDialogComponent } from '../shared/confirm-overlay-dialog/confirm-overlay-dialog.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { MessageboxComponent } from "../messagebox/messagebox.component";
import { QuestionboxComponent } from "../questionbox/questionbox.component";

/**
 * ManagePeopleComponent displays and manages the list of persons.
 *
 * Features:
 * - Display all persons in a list
 * - Search/filter persons by name or profession
 * - Add, edit, and delete persons
 * - Uses Angular Signals for reactive state management
 */
@Component({
  selector: 'app-manage-people',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmOverlayDialogComponent,
    ToolbarComponent,
    ReactiveFormsModule,
    SearchBarComponent,
    MessageboxComponent,
    QuestionboxComponent
  ],
  templateUrl: './manage-people.component.html',
  styleUrl: './manage-people.component.scss'
})
export class ManagePeopleComponent implements OnInit {
  /**
   * Signal holding the current search term entered by the user.
   * Updated when the user types in the search bar.
   */
  private searchTermSignal: WritableSignal<string> = signal('');

  /**
   * Computed signal that filters the persons list based on the search term.
   * Automatically updates whenever the persons list or search term changes.
   *
   * Filters by first name, last name, and profession (case-insensitive).
   */
  persons: Signal<Person[]> = computed(() => {
    const allPersons = this.personService.getItems()();
    const searchTerm = this.searchTermSignal().trim().toLowerCase();

    // If no search term, return all persons
    if (!searchTerm) {
      console.log('Returning all persons:', allPersons.length);
      return allPersons;
    }

    // Filter persons by search term
    const filtered = allPersons.filter(person =>
      person.firstName.toLowerCase().includes(searchTerm) ||
      person.lastName.toLowerCase().includes(searchTerm) ||
      person.profession.toLowerCase().includes(searchTerm)
    );

    console.log('Filtered persons:', filtered.length, 'with term:', searchTerm);
    return filtered;
  });

  // Dialog state
  showConfirmDialog = false;
  personToDelete: Person | null = null;
  dialogTitle = 'Delete Person';
  dialogMessage = '';

  constructor(private router: Router,
              private personService: PersonService) {
    // Clear any previously selected person when entering the manage view
    this.personService.clearSelectedItem();
  }

  ngOnInit(): void {
    // No initialization needed - signals are set up in the field declarations
  }

  /**
   * Toggles the selection state of a person.
   * Updates the person in the service to persist the change.
   *
   * @param person The person to toggle selection for
   */
  toggleSelection(person: Person): void {
    person.isSelected = !person.isSelected;
    // Update the person in the service to persist the change to localStorage
    this.personService.updateItem(person);
  }

  /**
   * Navigates to the add person page to create a new person.
   */
  onNewPersonClicked(): void {
    this.router.navigate(['/addPeople']);
  }

  /**
   * Opens the confirmation dialog to delete a person.
   *
   * @param person The person to delete
   */
  onDeletePersonClicked(person: Person): void {
    this.personToDelete = person;
    this.dialogMessage = `${person.firstName} ${person.lastName}`;
    this.showConfirmDialog = true;
  }

  /**
   * Navigates to the edit person page with the selected person.
   *
   * @param person The person to edit
   */
  onEditPersonClicked(person: Person): void {
    this.personService.setSelectedItem(person);
    this.router.navigate(['/addPeople']);
  }

  /**
   * Confirms the deletion of the selected person.
   * Removes the person from the service and closes the dialog.
   */
  onConfirmDelete(): void {
    if (this.personToDelete) {
      this.personService.removeItem(this.personToDelete.id);
      this.personToDelete = null;
    }
    this.showConfirmDialog = false;
  }

  /**
   * Cancels the deletion operation and closes the dialog.
   */
  onCancelDelete(): void {
    this.personToDelete = null;
    this.showConfirmDialog = false;
  }

  /**
   * Called when the user types in the search bar.
   * Updates the search term signal, which automatically triggers
   * the computed persons signal to refilter the list.
   *
   * @param searchTerm The search term entered by the user
   */
  onSearch(searchTerm: string): void {
    console.log('Search term:', searchTerm);
    this.searchTermSignal.set(searchTerm);
  }
}
