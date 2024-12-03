import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { userResponse, Users } from '../interfaces/users';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as URL from '../data/urls';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from './loading.service';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root', // Ensures the service is provided application-wide
})
export class UsersService {
  private userSubject = new BehaviorSubject<userResponse>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<userResponse>;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): userResponse {
    return this.userSubject.value;
  }

  registerUser(User: Users): Observable<any> {
    return this.http.post<any>(URL.USERS_REGISTER, User).pipe(
      tap({
        next: (res: userResponse) => {
          this.setUserToLocalStorage(res);
          this.userSubject.next(res);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error, 'لم يتم التسجيل');
        },
      })
    );
  }

  loginUser(user: Users): Observable<userResponse> {
    return this.http.post<userResponse>(URL.USERS_LOGIN, user).pipe(
      tap({
        next: (res: userResponse) => {
          this.setUserToLocalStorage(res);
          this.userSubject.next(res);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error, 'لم يتم التسجيل');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new userResponse());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: any) {
    console.log('from local', user);

    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): userResponse {
    if (typeof window !== 'undefined' && localStorage) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) {
        try {
          return JSON.parse(userJson) as userResponse;
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          localStorage.removeItem(USER_KEY);
        }
      }
    }
    return new userResponse();
  }
}
