import { Injectable } from '@angular/core';
import { Expense, subdate } from '../interfaces/expense';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as Url  from '../data/urls'
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  month!:number[];
  constructor(private httpClient:HttpClient,private userService : UsersService){   
    
  }
  

  get(date:subdate):Observable <number[]>{
    const userId = this.userService.currentUser.data._id || '';
    const body = {
      month:date.month,
      year:date.year,
      userId:userId
    }
    
    return this.httpClient.post<number[]>(Url.CHART_DAY,body)
  }
  calculateMonthExpenses():Observable <any>{
    const userId : string = this.userService.currentUser.data._id || '';
    const params = new HttpParams().append('userId',userId)
    return this.httpClient.get<any>(Url.CHART_MONTH,{params})
  }
  calculateYearExpenses():Observable <number[]>{
    return this.httpClient.get<number[]>(Url.CHART_YEAR)
  }

}
