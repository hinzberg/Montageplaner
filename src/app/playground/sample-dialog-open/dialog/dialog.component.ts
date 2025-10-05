import {Component, EventEmitter, Input, Output, input, output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent {

  //title = input("");
  // isOpen = input(false);
  // onClose = output<boolean>();
  @Input() title = "";
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<boolean>();

  closeDialog(): void {
    this.onClose.emit(true);
  }
}
