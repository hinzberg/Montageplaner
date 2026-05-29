import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-questionbox',
  standalone: true,
  imports: [],
  templateUrl: './questionbox.component.html',
  styleUrl: './questionbox.component.scss'
})
export class QuestionboxComponent {
  @Input() title = "Messagebox";
  @Input() isVisible = false;
  @Output() onOkClose = new EventEmitter<boolean>();
  @Output() onCancelClose = new EventEmitter<boolean>();

  closeOkDialog(): void {
    this.onOkClose.emit(true);
  }

  closeCancelDialog(): void {
    this.onCancelClose.emit(true);
  }
}
