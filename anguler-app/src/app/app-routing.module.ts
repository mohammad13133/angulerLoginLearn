import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NoAccessPageComponent } from './no-access-page/no-access-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoAccessPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
