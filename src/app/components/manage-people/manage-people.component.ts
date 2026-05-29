import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../core/services/person.service';
import { Person } from '../../core/models/person.model';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { QuestionboxComponent } from '../questionbox/questionbox.component';
import { AbstractManageComponent } from '../shared/abstract-manage.component';

/**
 * Displays and manages the list of persons: search, add, edit, delete.
 * All shared list logic lives in AbstractManageComponent.
 */
@Component({
  selector: 'app-manage-people',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    SearchBarComponent,
    QuestionboxComponent
  ],
  templateUrl: './manage-people.component.html',
  styleUrl: './manage-people.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagePeopleComponent extends AbstractManageComponent<Person> {
  protected readonly service = inject(PersonService);
  protected readonly addRoute = '/addPeople';
  readonly dialogTitle = 'Delete Person';

  protected matchesSearch(person: Person, term: string): boolean {
    return person.firstName.toLowerCase().includes(term) ||
      person.lastName.toLowerCase().includes(term) ||
      person.profession.toLowerCase().includes(term);
  }

  protected deleteLabel(person: Person): string {
    return `${person.firstName} ${person.lastName}`;
  }
}
