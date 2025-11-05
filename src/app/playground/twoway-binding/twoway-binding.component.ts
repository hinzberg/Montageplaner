import { Component } from '@angular/core';
import { FormsModule} from "@angular/forms";

@Component({
  selector: 'app-twoway-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './twoway-binding.component.html',
  styleUrl: './twoway-binding.component.scss'
})
export class TwowayBindingComponent {
  firstName: string = '';
  lastName: string = '';
  isEmployee: boolean = false;
}
