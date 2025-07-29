import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {
  PeopleAddedOverlayDialogComponent
} from "../add-people/people-added-overlay-dialog/people-added-dialog.component";

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    PeopleAddedOverlayDialogComponent,
    ReactiveFormsModule
  ],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.scss'
})
export class AddEquipmentComponent implements OnInit {

  // HeadlineTitle
  headlineTitle = 'Add Staff';

  ngOnInit(): void {

  }

}
