import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from './shared/auth.guard';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard],data:{role:'2'}},
  { path: 'addUser', component: UpdateUserComponent,canActivate:[AuthGuard],data:{role:'2'}},
  { path: 'reports', component: ReportsComponent,canActivate:[AuthGuard],data:{role:'2'}},
  { path: 'userHome', component: UserhomeComponent,canActivate:[AuthGuard],data:{role:'1'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
