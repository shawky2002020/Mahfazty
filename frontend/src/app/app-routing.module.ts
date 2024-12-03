import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { IncomeComponent } from './pages/income/income.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
  {path:'expenses',component:ExpensesComponent,canActivate:[authGuard]},
  {path:'income',component:IncomeComponent,canActivate:[authGuard]},
  {path:'wallet',component:WalletComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
