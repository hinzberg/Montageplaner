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
import { PlaygroundMainComponent} from "./playground/playground-main/playground-main.component";

// Playground imports
import { TwowayBindingComponent} from "./playground/twoway-binding/twoway-binding.component";
import { SamplePipesComponent } from './playground/sample-pipes/sample-pipes.component';
import { SampleCustomPipeComponent} from "./playground/sample-custom-pipe/sample-custom-pipe.component";
import { ClassBindingComponent} from "./playground/class-binding/class-binding.component";
import { StyleBindingComponent } from "./playground/style-binding/style-binding.component";
import { ArraySampleComponent} from "./playground/array-sample/array-sample.component";
import {SimpleSignalComponent} from "./playground/simple-signal/simple-signal.component";
import { EventBindingComponent} from "./playground/event-binding/event-binding.component";
import { DataserviceSampleComponent} from "./playground/dataservice-sample/dataservice-sample.component";
import { ListParentComponent } from "./playground/sample-list-child/list-parent/list-parent.component";
import { DialogParentComponent} from "./playground/sample-dialog-open/dialog-parent/dialog-parent.component";

export const routes: Routes = [
  // The path with an empty name is the default page and will be loaded automatically at startup.
  { path: '', component: DataserviceSampleComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'addPeople', component: AddPeopleComponent },
  { path: 'addEquipment', component: AddEquipmentComponent },
  { path: 'manageEquipment', component: ManageEquipmentComponent },
  { path: 'managePeople', component: ManagePeopleComponent },
  { path: 'plan', component: PlanAssemblyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'playground', component: PlaygroundMainComponent },
  { path: 'playground-class-binding', component: ClassBindingComponent },
  { path: 'playground-style-binding', component: StyleBindingComponent },
  { path: 'playground-array', component: ArraySampleComponent },
  { path: 'playground-two-way', component: TwowayBindingComponent },
  { path: 'playground-pipes', component: SamplePipesComponent },
  { path: 'playground-custom-pipes', component: SampleCustomPipeComponent },
  { path: 'playground-simple-signal', component: SimpleSignalComponent },
  { path: 'playground-event-binding', component: EventBindingComponent },
  { path: 'playground-country-service', component: DataserviceSampleComponent },
  { path: 'playground-list-parent', component: ListParentComponent },
  { path: 'playground-dialog-parent', component: DialogParentComponent },
  { path: '**', pathMatch: 'full',component: WrongRouteComponent}
];
