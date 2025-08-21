import { Component, OnInit, OnDestroy } from '@angular/core';
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {Router} from "@angular/router";
import {EquipmentService} from "../../core/services/equipment.service";
import {Subscription} from "rxjs";
import {Equipment} from "../../core/models/equipment.model";
import {CommonModule} from "@angular/common";
import {Person} from "../../core/models/person.model";
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

export class ManageEquipmentComponent implements OnInit, OnDestroy {

  equipments: Equipment[] = [];
  private subscription: Subscription = new Subscription();

  // Dialog state
  showConfirmDialog = false;
  equipmentToDelete: Equipment | null = null;
  dialogTitle = 'Delete Equipment';
  dialogMessage = '';

  constructor(private router: Router,
              private equipmentService: EquipmentService) {
    this.equipmentService.clearSelectedItem();
  }

  ngOnInit(): void {
    // Get initial list of equipment
    this.equipments = this.equipmentService.getItems();
    // Subscribe to updates
    this.subscription.add(
      this.equipmentService.itemsUpdated.subscribe(equipment => {
        this.equipments = equipment;
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
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
