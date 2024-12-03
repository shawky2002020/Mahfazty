import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Expense, subdate } from '../interfaces/expense';
import { UsersService } from './users.service';
import * as URL from '../data/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http : HttpClient,private userService : UsersService,private toast:ToastrService) { }
  monthfilter(subdate:subdate):Observable<Expense[]>{
    const userId = this.userService.currentUser.data._id || '';
    const body = {
      userId:userId,
      subDate:subdate
    }
    return this.http.post<Expense[]>(URL.MONTH_FILTER,body)
  }
  // yearfilter(year:number):Observable<Expense[]>{
  //   const userId = this.userService.currentUser.data._id || '';
  //   const body = {
  //     userId:userId,
  //     year:year
  //   }
  //   return this.http.post<Expense[]>('',body)
  // }


}
