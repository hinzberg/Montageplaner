import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WrongRouteComponent } from './components/wrong-route/wrong-route.component';
import { AddPeopleComponent } from './components/add-people/add-people.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { ManagePeopleComponent } from './components/manage-people/manage-people.component';
import { ManageEquipmentComponent } from './components/manage-equipment/manage-equipment.component';
import { PlanAssemblyComponent } from './components/plan-assembly/plan-assembly.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { PLAYGROUND_ROUTES } from './playground/playground.routes';

export const routes: Routes = [
  // The path with an empty name is the default page, loaded automatically at startup.
  { path: '', component: SplashComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'addPeople', component: AddPeopleComponent },
  { path: 'addEquipment', component: AddEquipmentComponent },
  { path: 'manageEquipment', component: ManageEquipmentComponent },
  { path: 'managePeople', component: ManagePeopleComponent },
  { path: 'plan', component: PlanAssemblyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'maintenance', component: MaintenanceComponent },

  // Development-only sample routes (lazily loaded, kept out of the main bundle).
  ...PLAYGROUND_ROUTES,

  { path: '**', pathMatch: 'full', component: WrongRouteComponent }
];
