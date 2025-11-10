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
// Playground imports
/*
import { ListParentComponent } from "./playground/sample-list-child/list-parent/list-parent.component";
import { DialogParentComponent} from "./playground/sample-dialog-open/dialog-parent/dialog-parent.component";
import {SimpleSignalComponent} from "./playground/simple-signal/simple-signal.component";
import { TwowayBindingComponent} from "./playground/twoway-binding/twoway-binding.component";
import { ClassBindingComponent} from "./playground/class-binding/class-binding.component";
import { StyleBindingComponent } from "./playground/style-binding/style-binding.component";
*/
import { EventBindingComponent} from "./playground/event-binding/event-binding.component";

export const routes: Routes = [
  // The path with an empty name is the default page and will be loaded automatically at startup.
  //{ path: '', component: SplashComponent },
  { path: '', component:  EventBindingComponent },
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
