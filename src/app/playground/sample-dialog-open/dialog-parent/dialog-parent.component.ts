import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-parent',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './dialog-parent.component.html',
  styleUrl: './dialog-parent.component.scss'
})

export class DialogParentComponent {
  showDialog = false;
}
