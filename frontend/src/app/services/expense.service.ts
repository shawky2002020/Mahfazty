import { Injectable } from '@angular/core';
import { Expense } from '../interfaces/expense';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';
import * as Url from '../data/urls';
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];
  expenseType!: string;

  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService,
    private toast: ToastrService
  ) {
    // this.getExpense().subscribe({
    //   next: (val) => {
    //     this.expenses = val;
    //   },
    // });
  }

  getExpense(Id: string): Observable<Expense[]> {
    const body = { userId: Id };
    return this.httpClient.post<Expense[]>(Url.Expense_BASE, body);
  }

  get expense() {
    return this.expenses;
  }

  saveExpense(expense: Expense[]) {
    this.expenses = expense;
  }

  addExpense(expense: Expense): Observable<any> {
    expense.userId = this.usersService.currentUser.data._id;
    return this.httpClient.post<any>(Url.ADD_EXPENSE, expense).pipe(
      tap({
        next: () => {
          this.toast.success('تم الاضافة بنجاح')
        },
        error: (err) => {
          this.toast.error('تم رفض العملية', '❌');
        },
      })
    );
  }
 

  delete(expense: Expense): Observable<Expense[]> {
    let params = new HttpParams();
    params = params.append('target', expense._id || '');
    return this.httpClient
      .delete<Expense[]>(Url.DELETE_EXPENSE, { params })
      .pipe(
        tap({
          next: () => {
            this.toast.success('تم الازالة بنجاح');
          },
          error: (err) => {
            this.toast.error('تم رفض العملية', '❌');
          },
        })
      );
  }

  getTypeExpense(sub: string, userId: string): Observable<Expense[]> {
    let params = new HttpParams();
    params = params.set('type', sub).set('userId', userId);

    return this.httpClient.get<Expense[]>(Url.TYPE_EXPENSE, { params });
  }

  getSubExpense(sub: string, userId: string): Observable<Expense[]> {
    let params = new HttpParams();
    params = params.append('subType', sub).append('userId', userId);
    return this.httpClient.get<Expense[]>(Url.SUBTYPE_EXPENSE, {
      params,
    });
  }

  calculateTotal(arr: Expense[]): number {
    let total = 0;
    arr.forEach((expense) => {
      total += expense.amount;
    });
    return total;
  }
}
