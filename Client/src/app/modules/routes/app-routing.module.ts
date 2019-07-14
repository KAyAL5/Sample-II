import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app-services/auth/auth-guard.service';

import { LoginComponent, DashboardComponent,
         RegistrationComponent, 
         ChatComponent } from '@app-components/index';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuardService]},
  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
