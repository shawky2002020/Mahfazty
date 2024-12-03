import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HttpErrorResponse, 
  HttpEventType 
} from '@angular/common/http';
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
    console.log();
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoading(); // Show the loading spinner at the start of a request

    return next.handle(req).pipe(
      tap((event) => {
        // Only handle hide loading for HTTP response events
        if (event.type === HttpEventType.Response ) {          
          this.handleHideLoading();
          // console.log('even');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 450) {
          // Handle token expiration: log out and redirect
          this.loadingService.valid = false;
          this.userService.logout();
          this.router.navigate(['/login']);
          
        }
        return throwError(() => error);
      }),
      finalize(() => {
        // Ensure the spinner is hidden when the request completes
        this.handleHideLoading();
        // console.log('final');
        
      })
    );
  }

  private showLoading(): void {
    if (this.pendingRequests === 0) {
      this.loadingService.showLoading(); // Show the spinner only for the first request
    }
    this.pendingRequests++;
  }

  private handleHideLoading(): void {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }
    if (this.pendingRequests === 0) {
      this.loadingService.hideLoading(); // Hide the spinner when no pending requests remain
    }
  }
}
