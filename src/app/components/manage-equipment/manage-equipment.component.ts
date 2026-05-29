import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentService } from '../../core/services/equipment.service';
import { Equipment } from '../../core/models/equipment.model';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { QuestionboxComponent } from '../questionbox/questionbox.component';
import { AbstractManageComponent } from '../shared/abstract-manage.component';

/**
 * Displays and manages the list of equipment: search, add, edit, delete.
 * All shared list logic lives in AbstractManageComponent.
 */
@Component({
  selector: 'app-manage-equipment',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    SearchBarComponent,
    QuestionboxComponent
  ],
  templateUrl: './manage-equipment.component.html',
  styleUrl: './manage-equipment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageEquipmentComponent extends AbstractManageComponent<Equipment> {
  protected readonly service = inject(EquipmentService);
  protected readonly addRoute = '/addEquipment';
  readonly dialogTitle = 'Delete Equipment';

  protected matchesSearch(equipment: Equipment, term: string): boolean {
    return equipment.description.toLowerCase().includes(term) ||
      equipment.equipmentType.toLowerCase().includes(term);
  }

  protected deleteLabel(equipment: Equipment): string {
    return equipment.description;
  }
}
