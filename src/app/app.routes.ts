import { Routes } from '@angular/router';
import { SplashComponent } from './Components/splash/splash.component';
import { SettingsComponent } from './Components/settings/settings.component';

export const routes: Routes = [
  // The path with an empty name is the default page and will be loaded automatically at startup.
  { path: '', component: SplashComponent },
  { path: 'settings', component: SettingsComponent },
];
