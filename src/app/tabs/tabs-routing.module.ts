import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabtobooks',
        loadChildren: () => import('../tabtobooks/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tabprofile',
        loadChildren: () => import('../tabprofile/tab2.module').then(m => m.Tab2PageModule)
      },
    
      {
        path: '',
        redirectTo: '/tabs/tabtobooks',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabtobooks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
