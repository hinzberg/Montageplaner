import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-messagebox',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './messagebox.component.html',
  styleUrl: './messagebox.component.scss'
})
export class MessageboxComponent {
  @Input() title = "Messagebox";
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<boolean>();

  closeDialog(): void {
    this.onClose.emit(true);
  }
}


