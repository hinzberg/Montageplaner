import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  standalone: true,
  imports: [],
  templateUrl: './event-binding.component.html',
  styleUrl: './event-binding.component.scss'
})
export class EventBindingComponent {

  textInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
  }

  buttonClick(event: Event) {
    console.log('Button clicked');
  }

  state: string = '';

  setState(newState: string): void {
    this.state = newState;

    if (newState === 'active') {
      console.log('State was set to active.');
    }
  }

  setStateEvent(newState: string, event: Event): void {
    this.state = newState;

    // This is the Event Object
    console.log('Event:', event);

    if (newState === 'active') {
      console.log('State was set to active.');
    }
  }
}
