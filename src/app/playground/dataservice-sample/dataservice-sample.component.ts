import { Component } from '@angular/core';
import { DataService} from "./data.service";

@Component({
  selector: 'app-dataservice-sample',
  standalone: true,
  imports: [],
  templateUrl: './dataservice-sample.component.html',
  styleUrl: './dataservice-sample.component.scss'
})
export class DataserviceSampleComponent {

  constructor(public dataService: DataService) {
  }
}
