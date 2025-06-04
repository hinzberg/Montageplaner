import { Routes } from '@angular/router';
import { SplashComponent } from './Components/splash/splash.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { WrongRouteComponent} from "./Components/wrong-route/wrong-route.component";
import { AddPersonnelComponent} from "./Components/add-personnel/add-personnel.component";
import { AddResourceComponent} from "./Components/add-resource/add-resource.component";
import {ManagePersonnelComponent} from "./Components/manage-personnel/manage-personnel.component";
import { ManageResourcesComponent } from "./Components/manage-resources/manage-resources.component";
import { PlanAssemblyComponent} from "./Components/plan-assembly/plan-assembly.component";
import { PersonFormComponent} from "./playground/person-form/person-form.component";
import { SidebarGroupComponent} from "./Components/navigation-sidebar/sidebar-group/sidebar-group.component";

export const routes: Routes = [
  // The path with an empty name is the default page and will be loaded automatically at startup.
  // { path: '', component: SplashComponent },
  { path: '', component: SidebarGroupComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'addPersonnel', component: AddPersonnelComponent },
  { path: 'addResource', component: AddResourceComponent },
  { path: 'manageResources', component: ManageResourcesComponent },
  { path: 'managePersonnel', component: ManagePersonnelComponent },
  { path: 'plan', component: PlanAssemblyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', pathMatch: 'full',component: WrongRouteComponent}
];
