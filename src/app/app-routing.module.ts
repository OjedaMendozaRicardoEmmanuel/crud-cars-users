import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrudUserComponent } from './pages/crud-user/crud-user.component';
import { CrudCarComponent } from './pages/crud-car/crud-car.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './service/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate:[AuthGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch:'full'},
      { path: 'crud-user', component: CrudUserComponent },
      { path: 'crud-car', component: CrudCarComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
