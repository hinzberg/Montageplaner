import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-overlay-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-overlay-dialog.component.html',
  styleUrls: ['./confirm-overlay-dialog.component.scss']
})

export class ConfirmOverlayDialogComponent {

  @Input() isVisible = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() useInnerHTML = false;
  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmEvent.emit();
    this.isVisible = false;
  }

  onCancel(): void {
    this.cancelEvent.emit();
    this.isVisible = false;
  }

  onOverlayClick(event: MouseEvent): void {
    // Only close if clicking the overlay itself, not its children
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
