import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { InfoBoxType } from './info-box-type.enum';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss'
})
export class InfoBoxComponent {
  type = input<InfoBoxType>(InfoBoxType.Error);
  protected readonly InfoBoxType = InfoBoxType;
}
