import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class loadingInterceptor implements HttpInterceptor {
  private pendingRequests = 0;

  constructor(
    private userService: UsersService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap((event) => {
        // Only handle hide loading for HTTP response events
       
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 450) {
          // Handle token expiration: log out and redirect
          console.log('token expired');
          
          this.loadingService.valid = false;
          this.showLoading()
          this.userService.logout();
          this.router.navigate(['/login']);
          
        }
        return throwError(() => error);
      }),
      
    );
  }

  private showLoading(): void {
      this.loadingService.showLoading(); // Show the spinner only for the first request
    // this.pendingRequests++;
  }

 
}
