import {
  AfterContentInit,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Expense, subdate } from '../../interfaces/expense';
import { ChartService } from '../../services/chart.service';
import { ExpenseService } from '../../services/expense.service';
import { UsersService } from '../../services/users.service';
import { FilterService } from '../../services/filter.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
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
  
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
      
})
export class IncomeComponent implements OnInit {
  userId!: string;
  constructor(
    public expenseService: ExpenseService,
    private chartService: ChartService,
    private userService: UsersService,
    private filterService: FilterService,
    private toast : ToastrService
  ) {
    this.userId = this.userService.currentUser.data._id || '';
  }

  expenses!: Expense[];
  loaded: boolean = false;
  salaryExpense: Expense[] = [];
  bonusExpense: Expense[] = [];
  otherExpense: Expense[] = [];
  toogle: boolean[] = [];
  totalSum: number[] = [];
  totalExpenses: number = 0;
  pageExpenses: Expense[] = [];
  pagesArray: number[] = [];
  subDate!: subdate;
  dateSelected = false;
  chartLoaded = false;
  maxItemsPerPage = 10;

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    forkJoin({
      salary: this.expenseService.getSubExpense('مرتب', this.userId),
      bonus: this.expenseService.getSubExpense('مكافأة', this.userId),
      other: this.expenseService.getSubExpense('اخرى', this.userId),
      expenses: this.expenseService.getTypeExpense('دخل', this.userId),
    }).subscribe({
      next: ({ salary, bonus, other, expenses }) => {
        this.salaryExpense = salary;
        this.bonusExpense = bonus;
        this.otherExpense = other;
        this.expenses = expenses;

        // Initialize toggles
        this.toogle = Array(this.expenses.length).fill(false);

        // Calculate totals
        this.totalSum = [
          this.expenseService.calculateTotal(this.salaryExpense),
          this.expenseService.calculateTotal(this.bonusExpense),
          this.expenseService.calculateTotal(this.otherExpense),
        ];

        // Display data
        console.log('All data loaded successfully');
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.toast.error('حدث خطأ أثناء تحميل البيانات');
        this.loaded = true;
      },
      complete: () => {
        this.updateChartData();
        this.getItemsPerPage()
        this.loaded = true;
      },
    });
  }

  updateChartData() {
    this.pieChartDatasets = [
      {
        data: this.totalSum,
      },
    ];
    this.single.forEach((obj, i) => {
      obj.name = this.pieChartLabels[i][0];
      obj.value = this.totalSum[i];
    });
  }

  show(i: number) {
    this.toogle[i] = !this.toogle[i];
  }

  filter(s: string) {
    if (s === 'salary') {
      const salaryExp = this.salaryExpense;
      if (this.dateSelected) {
        const filteredExpenses = salaryExp.filter((expense) => {
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
        this.expenses = salaryExp;
      }
    } else if (s === 'bonus') {
      const bonusExp = this.bonusExpense;
      if (this.dateSelected) {
        const filteredExpenses = bonusExp.filter((expense) => {
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
        this.expenses = bonusExp;
      }
    } else if (s === 'other') {
      const otherExp = this.otherExpense;
      if (this.dateSelected) {
        const filteredExpenses = otherExp.filter((expense) => {
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
        this.expenses = otherExp;
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
        this.chartLoaded = false;

        // Filter expenses by type
        this.expenses = filterExpenses.filter(
          (filteredExp) => filteredExp.type === 'صرف'
        );

        // Filter by subType and calculate totals
        this.filterBySubType(this.expenses);
        this.totalSum = [
          this.expenseService.calculateTotal(this.salaryExpense),
          this.expenseService.calculateTotal(this.bonusExpense),
          this.expenseService.calculateTotal(this.otherExpense),
        ];

        // Update pagination data
        this.getItemsPerPage();
      },
      error: (err) => {
        this.pageExpenses = [];
        this.toast.info(err.error, '');
      },
      complete: () => {
        // Update chart data with a new reference
        this.single = [
          ...this.totalSum.map((sum, index) => ({
            name: this.getExpenseCategoryName(index), // Map index to category name
            value: sum,
          })),
        ];

        this.updateChartData();
        this.chartLoaded = true;
      },
    });
  }

  // Helper function to map category index to names
  getExpenseCategoryName(index: number): string {
    const categories = ['مصروفات شخصية', 'زكاة مال', 'مصاريف بيت'];
    return categories[index] || 'Unknown';
  }

  filterBySubType(Exps: Expense[]) {
    // Reset the arrays
    this.salaryExpense = [];
    this.bonusExpense = [];
    this.otherExpense = [];
    // Categorize expenses
    Exps.forEach((expense) => {
      switch (expense.subType) {
        case 'مرتبى':
          this.salaryExpense.push(expense);
          break;
        case 'مكافأة':
          this.bonusExpense.push(expense);
          break;
        case 'اخرى':
          this.otherExpense.push(expense);
          break;
        default:
          // Handle other cases or ignore
          break;
      }
    });
    // Debugging
    console.log('salary Expenses:', this.salaryExpense);
    console.log('bonus Expenses:', this.bonusExpense);
    console.log('other Expenses:', this.otherExpense);
  }

  getPagesNum(expenses: Expense[]) {
    let pages = Math.ceil(expenses.length / this.maxItemsPerPage);
    let arrayOfPages = Array(pages).fill(0);
    this.pagesArray = arrayOfPages;
  }

  getItemsPerPage(page: number = 0) {
    let start = page * this.maxItemsPerPage;
    let end = (page + 1) * this.maxItemsPerPage;
    this.pageExpenses = this.expenses.slice(start, end);
    this.getPagesNum(this.expenses);
  }

  //CHART VARIABLES

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    color: 'whitesmoke',
  };

  public pieChartLabels = [['مرتب'], ['مكافأة'], ['اخرى']];
  public pieChartDatasets = [
    {
      data: this.totalSum,
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  single = [
    {
      name: 'مصروفات شخصية',
      value: 0,
    },
    {
      name: 'زكاة مال',
      value: 0,
    },
    {
      name: 'مصاريف بيت',
      value: 0,
    },
  ];
  view: [number, number] = [window.innerWidth > 600? 500 : window.innerWidth *.8
    , 400]; // Default width and height
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateChartSize();
  }

  updateChartSize() {
    if (window.innerWidth < 600) {
      this.view = [window.innerWidth - 50, 400]; // Adjust for smaller screens
      
    }
    const width = window.innerWidth * 0.8; // Adjust as per your requirement

    const height = 400; // Fixed height or calculate dynamically
    this.view = [width, height];
  }

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  labels = [
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
  ];
}
