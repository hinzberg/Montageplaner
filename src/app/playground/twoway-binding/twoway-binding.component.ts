import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-twoway-binding',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './twoway-binding.component.html',
  styleUrl: './twoway-binding.component.scss'
})
export class TwowayBindingComponent {
  firstName: string = '';
  lastName: string = '';
  isEmployee: boolean = false;
}
