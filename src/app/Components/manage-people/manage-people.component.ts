import {Component, OnInit, OnDestroy} from '@angular/core';
import {PersonService} from '../../core/services/person.service';
import {Person} from '../../core/models/person.model';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {ConfirmOverlayDialogComponent} from '../shared/confirm-overlay-dialog/confirm-overlay-dialog.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-manage-people',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmOverlayDialogComponent,
    ToolbarComponent,
    ReactiveFormsModule,
    SearchBarComponent],
  templateUrl: './manage-people.component.html',
  styleUrl: './manage-people.component.scss'
})
export class ManagePeopleComponent implements OnInit, OnDestroy {
  persons$: Observable<Person[]> = new Observable<Person[]>(); // will hold the list of persons
  search$ = new BehaviorSubject<string>('');       // will receive search terms
  private subscription: Subscription = new Subscription();

  // Dialog state
  showConfirmDialog = false;
  personToDelete: Person | null = null;
  dialogTitle = 'Delete Person';
  dialogMessage = '';

  /*
  filteredPersons$: Observable<Person[]> = combineLatest([
    this.persons,
    this.search$.pipe(startWith(''))
  ]).pipe(
    map(([persons, term]) => {   // <-- name it `persons` (array)
      const t = (term || '').trim().toLowerCase();
      if (!t)
        return persons;

      return this.persons.filter(p =>
        p.name.toLowerCase().includes(t) ||
        p.firstName.toLowerCase().includes(t)
      );
    })
  );
*/
  constructor(private router: Router,
              private personService: PersonService) {

    // Initialize the personEditService to ensure it's ready for use
    this.personService.clearSelectedItem();
  }

  ngOnInit(): void {
    // Get initial list of persons
    this.persons$ = this.personService.getItems();
  }

  toggleSelection(person: Person): void {
    person.isSelected = !person.isSelected;
    // Update the person selection in the service to persist the change
    this.personService.updateItem(person);
  }

  onNewPersonClicked(): void {
    let navigateSuccess = this.router.navigate(['/addPeople']);
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
  }
}
