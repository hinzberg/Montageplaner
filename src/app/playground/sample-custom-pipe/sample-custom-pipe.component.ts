import { Component } from '@angular/core';
import { TruncatePipe} from "./truncate.pipe";

@Component({
  selector: 'app-sample-custom-pipe',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './sample-custom-pipe.component.html',
  styleUrl: './sample-custom-pipe.component.scss'
})
export class SampleCustomPipeComponent {

  longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}
