import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Expense, subdate } from '../../interfaces/expense';
import { ChartService } from '../../services/chart.service';
import { ExpenseService } from '../../services/expense.service';
import { UsersService } from '../../services/users.service';
import { FilterService } from '../../services/filter.service';
import { ToastrService } from 'ngx-toastr';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css',
  animations: [
    trigger('shake', [
      transition('* => *', [
        animate(
          '300ms',
          keyframes([
            style({ transform: 'translateX(-10px)', offset: 0.2 }),
            style({ transform: 'translateX(10px)', offset: 0.4 }),
            style({ transform: 'translateX(-10px)', offset: 0.6 }),
            style({ transform: 'translateX(10px)', offset: 0.8 }),
            style({ transform: 'translateX(0)', offset: 1.0 })
          ])
        )
      ])
    ]),
    trigger('dropInStagger', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateY(-40px)', opacity: 0 }),
          stagger('150ms', [
            animate('800ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('waveStagger', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateY(20px)', opacity: 0 }),
          stagger('150ms', [
            animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
          ]),
          query(':enter:nth-child(even)', [
            animate('1000ms ease-in', style({ transform: 'translateY(-10px)' }))
          ], { optional: true })
        ], { optional: true })
      ])
    ])
  ]
    
})
export class WalletComponent implements OnInit {
  userId!: string;
  pagesArray!: number[];
  expenses!: Expense[];
  initialItems:Expense[]=[]
  pageExpenses: Expense[] = [];
  outcomeExpense!: Expense[];
  incomeExpense!: Expense[];
  subDate!: subdate;
  dateSelected = false;
  maxItemsPerPage = 10;
  constructor(
    public expenseService: ExpenseService,
    private userService: UsersService,
    private filterService: FilterService,
    private toast: ToastrService
  ) {
    this.userId = this.userService.currentUser.data._id || '';
    
  }
  toogle!: boolean[];
  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.getExpenses();
    this.getOutExp();
    this.getInExp();
  }
  getExpenses() {
    this.expenseService.getExpense(this.userId).subscribe({
      next: (Expenses) => {
        this.expenses = Expenses;
        this.toogle = Array(this.expenses.length).fill(false);
      },
      error(err) {
        console.log(err);
      },
      complete: () => {
        this.getItemsPerPage();
      },
    });
  }
  getOutExp() {
    this.expenseService.getTypeExpense('صرف', this.userId).subscribe((val) => {
      this.outcomeExpense = val;
    });
  }

  getInExp() {
    this.expenseService.getTypeExpense('دخل', this.userId).subscribe((val) => {
      this.incomeExpense = val;
    });
  }

  getPagesNum(expenses: Expense[]) {
    console.log(expenses);
    let pages = Math.ceil((expenses.length / this.maxItemsPerPage)); 
    console.log(pages);
    let arrayOfPages = Array(pages).fill(0);
    this.pagesArray = arrayOfPages;
  }

  getItemsPerPage(page: number = 0) {

    let start = (page) * this.maxItemsPerPage;
    let end = (page+1) * this.maxItemsPerPage;
    this.pageExpenses = this.expenses.slice(start, end);
    console.log(this.pageExpenses);
    this.getPagesNum(this.expenses);
    
  }


  filter(s: string) {
    if (s === 'دخل') {
      const incomeExps = this.incomeExpense;
      if (this.dateSelected) {
        const filteredExpenses = incomeExps.filter((expense) => {
          const expenseDate = {
            month: expense.subDate[0].month,
            year: expense.subDate[0].year,
          };

          return (
            expenseDate.month == this.subDate.month &&
            expenseDate.year == this.subDate.year
          );
        });
        this.expenses = filteredExpenses;
      } else {
        this.expenses = incomeExps;
      }
    } else if (s === 'صرف') {
      const outcomeExps = this.outcomeExpense;
      if (this.dateSelected) {
        const filteredExpenses = outcomeExps.filter((expense) => {
          const expenseDate = {
            month: expense.subDate[0].month,
            year: expense.subDate[0].year,
          };

          return (
            expenseDate.month == this.subDate.month &&
            expenseDate.year == this.subDate.year
          );
        });
        this.expenses = filteredExpenses;
      } else {
        this.expenses = outcomeExps;
      }
    }

    this.getItemsPerPage();
    this.toogle.fill(false, 0, this.toogle.length);
  }

  filterDate(datestring: string) {
    this.dateSelected = true;
    const date = new Date(datestring);
    let subdate = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    this.subDate = subdate;
    this.filterService.monthfilter(subdate).subscribe({
      next: (filterExpenses) => {
        this.expenses = filterExpenses;
        this.getItemsPerPage();
      },
      error: (err) => {
        this.pageExpenses = [];
        this.toast.info(err.error, '');
      },
    });
  }

  add(expense: Expense) {
    let date = new Date();
    let subdate = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    let newExpense: Expense = {
      userId: expense.userId,
      amount: expense.amount,
      name: expense.name,
      date: date,
      subDate: [subdate],
      type: expense.type,
      subType: expense.subType,
    };
    this.expenseService.addExpense(newExpense).subscribe({
      
      error: (err) => {
        console.log(err);
      },
      complete:()=>{
        this.getExpenses()
      }
    });
  }

  delete(expense: Expense, i: number) {
    this.expenseService.delete(expense).subscribe({
      next: (val) => {
        this.expenseService.saveExpense(val);

        this.pageExpenses.splice(i, 1);
      },
      complete:()=>{
        this.getExpenses()
      }
    });
  }

  show(i: number) {
    this.toogle[i] = !this.toogle[i];
  }
}