import { Routes } from '@angular/router';

/**
 * Playground / learning sample routes.
 *
 * Lazily loaded so the demo components are code-split out of the main
 * production bundle. They remain reachable in the running app for development.
 */
export const PLAYGROUND_ROUTES: Routes = [
  {
    path: 'playground',
    loadComponent: () => import('./playground-main/playground-main.component').then(m => m.PlaygroundMainComponent)
  },
  {
    path: 'playground-class-binding',
    loadComponent: () => import('./class-binding/class-binding.component').then(m => m.ClassBindingComponent)
  },
  {
    path: 'playground-style-binding',
    loadComponent: () => import('./style-binding/style-binding.component').then(m => m.StyleBindingComponent)
  },
  {
    path: 'playground-array',
    loadComponent: () => import('./array-sample/array-sample.component').then(m => m.ArraySampleComponent)
  },
  {
    path: 'playground-two-way',
    loadComponent: () => import('./twoway-binding/twoway-binding.component').then(m => m.TwowayBindingComponent)
  },
  {
    path: 'playground-pipes',
    loadComponent: () => import('./sample-pipes/sample-pipes.component').then(m => m.SamplePipesComponent)
  },
  {
    path: 'playground-custom-pipes',
    loadComponent: () => import('./sample-custom-pipe/sample-custom-pipe.component').then(m => m.SampleCustomPipeComponent)
  },
  {
    path: 'playground-simple-signal',
    loadComponent: () => import('./simple-signal/simple-signal.component').then(m => m.SimpleSignalComponent)
  },
  {
    path: 'playground-event-binding',
    loadComponent: () => import('./event-binding/event-binding.component').then(m => m.EventBindingComponent)
  },
  {
    path: 'playground-country-service',
    loadComponent: () => import('./dataservice-sample/dataservice-sample.component').then(m => m.DataserviceSampleComponent)
  },
  {
    path: 'playground-list-parent',
    loadComponent: () => import('./sample-list-child/list-parent/list-parent.component').then(m => m.ListParentComponent)
  },
  {
    path: 'playground-dialog-parent',
    loadComponent: () => import('./sample-dialog-open/dialog-parent/dialog-parent.component').then(m => m.DialogParentComponent)
  }
];
