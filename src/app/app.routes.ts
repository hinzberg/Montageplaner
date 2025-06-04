import { Routes } from '@angular/router';
import { SplashComponent } from './Components/splash/splash.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { WrongRouteComponent} from "./Components/wrong-route/wrong-route.component";
import { AddStaffComponent} from "./Components/add-staff/add-staff.component";
import { AddResourceComponent} from "./Components/add-resource/add-resource.component";
import { ManageStaffComponent } from "./Components/manage-staff/manage-staff.component";
import { ManageResourcesComponent } from "./Components/manage-resources/manage-resources.component";
import { PlanAssemblyComponent} from "./Components/plan-assembly/plan-assembly.component";
import { PersonFormComponent} from "./playground/person-form/person-form.component";

export const routes: Routes = [
  // The path with an empty name is the default page and will be loaded automatically at startup.
  { path: '', component: SplashComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'addStaff', component: AddStaffComponent },
  { path: 'addResource', component: AddResourceComponent },
  { path: 'manageResources', component: ManageResourcesComponent },
  { path: 'manageStaff', component: ManageStaffComponent },
  { path: 'plan', component: PlanAssemblyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', pathMatch: 'full',component: WrongRouteComponent}
];
