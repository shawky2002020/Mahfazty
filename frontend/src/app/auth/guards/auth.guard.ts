import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router,private toast:ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.userService.currentUser;

    // Check if the user is authenticated
    if (currentUser?.token) {
      console.log('AuthGuard:', this.userService.currentUser);
      return true;
    }

    // Redirect to the login page with a return URL
    this.toast.info('','الرجاء تسجيل الدخول اولا')
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
