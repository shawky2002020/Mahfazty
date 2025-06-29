import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './partials/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { IncomeComponent } from './pages/income/income.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { loadingInterceptor } from './auth/loading.interceptor';
import { LoadingComponent } from './partials/loading/loading.component';
import { BufferComponent } from './partials/buffer/buffer.component';

@NgModule({ declarations: [
        AppComponent,
        NavBarComponent,
        DashboardComponent,
        HomeComponent,
        ExpensesComponent,
        IncomeComponent,
        WalletComponent,
        LoginComponent,
        RegisterComponent,
        LoadingComponent,
        BufferComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ToastrModule.forRoot({
            progressBar: true,
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
            extendedTimeOut: 1000,
            preventDuplicates: true,
            maxOpened:1,
            toastClass: 'arabic',
            titleClass: 'title-main',
        }),
        ReactiveFormsModule,
        NgChartsModule,
        NgxChartsModule,
        BrowserAnimationsModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: loadingInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: loadingInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
