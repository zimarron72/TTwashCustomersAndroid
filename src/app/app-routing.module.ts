import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'passwordapple1',
    loadChildren: () => import('./passwordapple1/passwordapple1.module').then( m => m.Passwordapple1PageModule)
  },
  {
    path: 'delete-cuenta',
    loadChildren: () => import('./delete-cuenta/delete-cuenta.module').then( m => m.DeleteCuentaPageModule)
  },
  {
    path: 'pasos',
    loadChildren: () => import('./pasosbookings/pasosbookings.module').then( m => m.PasosbookingsPageModule)
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
