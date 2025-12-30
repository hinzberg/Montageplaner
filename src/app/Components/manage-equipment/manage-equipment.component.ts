import { Component, OnInit, WritableSignal } from '@angular/core';
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {Router} from "@angular/router";
import {EquipmentService} from "../../core/services/equipment.service";
import {Equipment} from "../../core/models/equipment.model";
import {CommonModule} from "@angular/common";
import {ConfirmOverlayDialogComponent} from "../shared/confirm-overlay-dialog/confirm-overlay-dialog.component";

@Component({
  selector: 'app-manage-equipment',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    ConfirmOverlayDialogComponent
  ],
  templateUrl: './manage-equipment.component.html',
  styleUrl: './manage-equipment.component.scss'
})

export class ManageEquipmentComponent implements OnInit {

  equipments: WritableSignal<Equipment[]>; // Signal holding the list of equipments

  // Dialog state
  showConfirmDialog = false;
  equipmentToDelete: Equipment | null = null;
  dialogTitle = 'Delete Equipment';
  dialogMessage = '';

  constructor(private router: Router,
              private equipmentService: EquipmentService) {
    this.equipmentService.clearSelectedItem();
    // Get the equipments signal from the service
    this.equipments = this.equipmentService.getItems();
  }

  ngOnInit(): void {
  }

  toggleSelection(equipment: Equipment): void {
    equipment.isSelected = !equipment.isSelected;
    // Update the selection in the service to persist the change
    this.equipmentService.updateItem(equipment);
  }

  onNewEquipmentClicked(): void {
    let navigateSuccess = this.router.navigate(['/addEquipment']);
  }

  onDeleteEquipmentClicked(equipment: Equipment): void {
    this.equipmentToDelete = equipment;
    this.dialogMessage = `Are you sure you want to delete <strong>${equipment.description}</strong>?`;
    this.showConfirmDialog = true;
  }

  onEditEquipmentClicked(equipment: Equipment): void {
    this.equipmentService.setSelectedItem(equipment);
    this.router.navigate(['/addEquipment']);
  }

  onConfirmDelete(): void {
    if (this.equipmentToDelete) {
      this.equipmentService.removeItem(this.equipmentToDelete.id);
      this.equipmentToDelete = null;
    }
    this.showConfirmDialog = false;
  }

  onCancelDelete(): void {
    this.equipmentToDelete = null;
    this.showConfirmDialog = false;
  }
}
