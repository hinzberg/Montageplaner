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
import {MessageboxComponent} from "../messagebox/messagebox.component";
import {QuestionboxComponent} from "../questionbox/questionbox.component";

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
export class ManagePeopleComponent implements OnInit, OnDestroy {
  persons$: Observable<Person[]> = new Observable<Person[]>(); // will hold the list of persons
  search$ = new BehaviorSubject<string>('');       // will receive search terms
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
    // Get initial list of persons and combine with search for filtering
    this.persons$ = combineLatest([
      this.personService.getItems(),
      this.search$.pipe(startWith(''))
    ]).pipe(
      map(([persons, searchTerm]) => {
        console.log('Filtering with search term:', searchTerm, 'Type:', typeof searchTerm); // Debug log

        // Ensure searchTerm is a string
        const term = (typeof searchTerm === 'string' ? searchTerm : '').trim().toLowerCase();

        if (!term || term === '') {
          console.log('Returning all persons:', persons.length); // Debug log
          return persons;
        }

        const filtered = persons.filter(person =>
          person.firstName.toLowerCase().includes(term) ||
          person.lastName.toLowerCase().includes(term) ||
          person.profession.toLowerCase().includes(term)
        );

        console.log('Filtered persons:', filtered.length); // Debug log
        return filtered;
      })
    );
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
    this.dialogMessage = `${person.firstName} ${person.lastName}`;
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

  onSearch(searchTerm: string): void {
    // This method is called when the search term is changed
    // But it is not really needed, because the search term is already in the search$ subject
    // and the search$ subject is already subscribed to the search term
    // so when the search term is changed, the search$ subject will emit the new search term
    // and the persons$ observable will be filtered accordingly
    console.log('Search term:', searchTerm);
    this.search$.next(searchTerm);
  }
}
