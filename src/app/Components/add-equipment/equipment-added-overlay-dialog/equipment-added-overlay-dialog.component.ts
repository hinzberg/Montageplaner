import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgIf } from '@angular/common';
import { Equipment } from '../../../core/models/equipment.model';

@Component({
  selector: 'app-equipment-added-overlay-dialog',
  standalone: true,
  imports: [NgIf],
  templateUrl: './equipment-added-overlay-dialog.component.html',
  styleUrl: './equipment-added-overlay-dialog.component.scss'
})
export class EquipmentAddedOverlayDialogComponent {
  @Input() isVisible = false;
  @Input() title = 'New Equipment added';
  @Output() ok = new EventEmitter<void>();
  @Input() submittedEquipment: Equipment | null = null;

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
