import { Component } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  LowerCasePipe,
  UpperCasePipe,
  JsonPipe,
  PercentPipe,
  SlicePipe,
  TitleCasePipe
} from "@angular/common";

@Component({
  selector: 'app-sample-pipes',
  standalone: true,
  imports: [
    UpperCasePipe,
    LowerCasePipe,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    JsonPipe,
    PercentPipe,
    SlicePipe,
    TitleCasePipe
  ],
  templateUrl: './sample-pipes.component.html',
  styleUrl: './sample-pipes.component.scss'
})
export class SamplePipesComponent {

  sampleName : string = 'John of Johnson, 123 Main St.';
  sampleValue : number = 12345.6789;
  sampleCurrency : number = 12345.6789;
  sampleDate : Date = new Date();
  sampleObject : any = {
    name: 'John', lastname: 'Foe', age: 30 ,
    address: {street: 'Main St.', city: 'Grovers Mill', state: 'NJ'}
  };
  percentageSample : number = 0.5;
  arraySample : Array<string> = ['a1','b2','c3','d4','e5',"d6"];
}
