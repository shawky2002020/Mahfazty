import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartService } from '../../services/chart.service';
import { Expense } from '../../interfaces/expense';
import { UsersService } from '../../services/users.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // On adding the element
        style({ opacity: 0 }),
        animate('2000ms ease-in', style({ opacity: 1 })),
        
      ]),
      transition(':leave', [ // On removing the element
        animate('3000ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {
  expenses: Expense[] = [];
  incomeExpense!: Expense[];
  outcomeExpense!: Expense[];
  isDataLoaded: boolean = false; // Flag to check if data is loaded
  timerEnded = false;
  constructor(
    public expenseService: ExpenseService,
    private userService : UsersService,
    private chartService: ChartService,
  ) {
    setTimeout(() => {
      this.timerEnded = true;
    }, 3000);
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadChartData();
  }

  loadExpenses(): void {
    const userId = this.userService.currentUser.data._id || '';
    this.expenseService.getExpense(userId).subscribe({
      next: (val) => {
        this.expenses = val;
                
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.expenseService.getTypeExpense('دخل',userId).subscribe((val) => {
      this.incomeExpense = val;
    });

    this.expenseService.getTypeExpense('صرف',userId).subscribe((val) => {
      this.outcomeExpense = val;
    });
  }

  loadChartData(): void {
    
    this.chartService.calculateMonthExpenses().subscribe({
      next: (val) => {
        
        this.lineChartData.datasets[0].data = val;
        this.isDataLoaded = true; // Data is loaded
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  calculateIncome(): number {
    return this.incomeExpense
      ? this.expenseService.calculateTotal(this.incomeExpense)
      : 0;
  }

  calculateExpense(): number {
    return this.outcomeExpense
      ? this.expenseService.calculateTotal(this.outcomeExpense)
      : 0;
  }

  calculateTotal(): number {
    return this.calculateIncome() - this.calculateExpense();
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    datasets: [
      {
        data: [], // Data will be populated after loading
        label: 'صافى',
        fill: true,
        tension: .1,
        borderColor: 'whitesmoke',
        backgroundColor: '#03045e',
        pointBackgroundColor: 'black',
        pointHoverRadius:10,
        pointHitRadius:1,
        pointRadius:6
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true, // Use responsive layout
    scales: {
      x: {
        ticks: {
          color: 'whitesmoke',
          font:{
            size:20
          }         
        },
      },
      y: {
        ticks: {
          color: 'whitesmoke',
          font:{
            size:20,
          }
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'whitesmoke',
          boxHeight:20,
          font:{
            size:30
          }
          
        },
      },
    },
  };
  public lineChartLegend = true;
}
