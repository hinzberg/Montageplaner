import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {Person} from "../../../core/models/person.model";

@Component({
  selector: 'app-people-added-dialog',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './people-added-dialog.component.html',
  styleUrl: './people-added-dialog.component.scss'
})
export class PeopleAddedDialogComponent {
  @Input() isVisible = false;
  @Input() title = 'New Staff added';
  @Output() ok = new EventEmitter<void>();
  @Input() submittedPerson: Person | null = null;

  onConfirm(): void {
    this.ok.emit();
    this.isVisible = false;
  }

  onOverlayClick(event: MouseEvent): void {
    // Only close if clicking the overlay itself, not its children
    if (event.target === event.currentTarget) {
      this.ok.emit();
      this.isVisible = false;
    }
  }
}
