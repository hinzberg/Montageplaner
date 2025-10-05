import { Routes } from '@angular/router';
import { SplashComponent } from './Components/splash/splash.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { WrongRouteComponent} from "./Components/wrong-route/wrong-route.component";
import { AddPeopleComponent} from "./Components/add-people/add-people.component";
import { AddEquipmentComponent} from "./Components/add-equipment/add-equipment.component";
import { ManagePeopleComponent } from "./Components/manage-people/manage-people.component";
import { ManageEquipmentComponent } from "./Components/manage-equipment/manage-equipment.component";
import { PlanAssemblyComponent} from "./Components/plan-assembly/plan-assembly.component";
import { MaintenanceComponent} from "./Components/maintenance/maintenance.component";
import { ListParentComponent } from "./playground/sample-list-child/list-parent/list-parent.component";
import { DialogParentComponent} from "./playground/sample-dialog-open/dialog-parent/dialog-parent.component";
import { MessageboxComponent} from "./Components/messagebox/messagebox.component";

export const routes: Routes = [
  { path: '', component: MessageboxComponent },
  // The path with an empty name is the default page and will be loaded automatically at startup.
  { path: '', component: SplashComponent },
  //{ path: '', component: DialogParentComponent },
  // { path: '', component: ListParentComponent }, // Playground Sample list-child
  { path: 'splash', component: SplashComponent },
  { path: 'addPeople', component: AddPeopleComponent },
  { path: 'addEquipment', component: AddEquipmentComponent },
  { path: 'manageEquipment', component: ManageEquipmentComponent },
  { path: 'managePeople', component: ManagePeopleComponent },
  { path: 'plan', component: PlanAssemblyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: '**', pathMatch: 'full',component: WrongRouteComponent}
];
