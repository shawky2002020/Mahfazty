import { Component, OnChanges, OnInit } from '@angular/core';
import { ExpenseService } from './services/expense.service';
import { Expense } from './interfaces/expense';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit {
  expenses!:Expense[]
  constructor(private expenseService:ExpenseService){
    // expenseService.getExpense().subscribe({
    //   next:(value)=> {
    //     this.expenses=value
    //   },
    // })
  }
  ngOnInit(): void {
  }

  
}
