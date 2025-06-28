import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ChartService } from '../../services/chart.service';
import { Expense, subdate } from '../../interfaces/expense';
import { ChartOptions } from 'chart.js';
import { LegendPosition } from '@swimlane/ngx-charts';
import { UsersService } from '../../services/users.service';
import { FilterService } from '../../services/filter.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
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
export class ExpensesComponent implements OnInit {
  userId!:string;
  constructor(
    public expenseService: ExpenseService,
    private chartService: ChartService,
    private userService : UsersService,
    private filterService : FilterService,
    private toast : ToastrService
  ) {
    this.userId=this.userService.currentUser.data._id || ''
  }
  

  expenses!: Expense[];
  loaded: boolean = false;
  chartLoaded = false
  personalExpense: Expense[] = [];
  charityExpense: Expense[] = [];
  homeExpense: Expense[] = [];
  toogle: boolean[] = [];
  totalSum: number[] = [];
  totalExpenses!: number;
  pagesArray!: number[];
  maxItemsPerPage = 10;
  pageExpenses:Expense[]=[]
  subDate!:subdate;
  dateSelected = false;


  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    forkJoin({
      personalExpense: this.expenseService.getSubExpense('مصروفات شخصية', this.userId),
      charityExpense: this.expenseService.getSubExpense('زكاة مال', this.userId),
      homeExpense: this.expenseService.getSubExpense('مصاريف بيت', this.userId),
      expenses: this.expenseService.getTypeExpense('صرف', this.userId),
    }).subscribe({
      next: ({ personalExpense, charityExpense, homeExpense, expenses }) => {
        // Assign values to variables
        this.personalExpense = personalExpense;
        this.charityExpense = charityExpense;
        this.homeExpense = homeExpense;
        this.expenses = expenses;
  
        // Initialize toggle
        this.toogle = Array(this.expenses.length).fill(false);
  
        // Calculate total sums
        this.totalSum = [
          this.expenseService.calculateTotal(this.personalExpense),
          this.expenseService.calculateTotal(this.charityExpense),
          this.expenseService.calculateTotal(this.homeExpense),
        ];
  
        // Update the chart data
        this.updateChartData();
      },
      error: (err) => {
        console.error('Error loading data:', err);
      },
      complete: () => {
        this.getItemsPerPage();
        this.updateChartData();
        this.loaded=true;
      },
    });
  }

  filter(s: string) {
    if (s === 'personal') {
      const personalExp = this.personalExpense;
      if (this.dateSelected) {
        const filteredExpenses = personalExp.filter((expense) => {
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
        this.expenses = personalExp;
      }
    }
     else if (s === 'charity') {
      const charityExp = this.charityExpense;
      if (this.dateSelected) {
        const filteredExpenses = charityExp.filter((expense) => {
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
        this.expenses = charityExp;
      }
    }
     else if (s === 'home') {
      const homeExp = this.homeExpense;
      if (this.dateSelected) {
        const filteredExpenses = homeExp.filter((expense) => {
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
        this.expenses = homeExp;
      }
    }

    this.getItemsPerPage();
    this.toogle.fill(false, 0, this.toogle.length);
  }

  filterBySubType(Exps: Expense[]) {
    // Reset the arrays
    this.personalExpense = [];
    this.charityExpense = [];
    this.homeExpense = [];
    // Categorize expenses
    Exps.forEach((expense) => {
      switch (expense.subType) {
        case 'مصروفات شخصية':
          this.personalExpense.push(expense);
          break;
        case 'زكاة مال':
          this.charityExpense.push(expense);
          break;
        case 'مصاريف بيت':
          this.homeExpense.push(expense);
          break;
        default:
          // Handle other cases or ignore
          break;
      }
    });
    // Debugging
    console.log('Personal Expenses:', this.personalExpense);
    console.log('Charity Expenses:', this.charityExpense);
    console.log('Home Expenses:', this.homeExpense);
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
        this.expenses = filterExpenses.filter((filteredExp) => filteredExp.type === 'صرف');
        
        // Filter by subType and calculate totals
        this.filterBySubType(this.expenses);
        this.totalSum = [
          this.expenseService.calculateTotal(this.personalExpense),
          this.expenseService.calculateTotal(this.charityExpense),
          this.expenseService.calculateTotal(this.homeExpense),
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
        this.single = [...this.totalSum.map((sum, index) => ({
          name: this.getExpenseCategoryName(index), // Map index to category name
          value: sum,
        }))];
  
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

  
  show(i: number) {
    this.toogle[i] = !this.toogle[i];
  }

  getPagesNum(expenses: Expense[]) {
    let pages = Math.ceil((expenses.length / this.maxItemsPerPage)); 
    let arrayOfPages = Array(pages).fill(0);
    this.pagesArray = arrayOfPages;
  }

  getItemsPerPage(page: number = 0) {
    let start = (page) * this.maxItemsPerPage;
    let end = (page+1) * this.maxItemsPerPage;
    this.pageExpenses = this.expenses.slice(start, end);
    this.getPagesNum(this.expenses);
  }

  //CHARTS
  updateChartData() {
    this.pieChartDatasets = [
      {
        data: this.totalSum,
      },
    ];
    this.single.forEach((obj,i)=>{
      obj.name=this.pieChartLabels[i][0]
      obj.value=this.totalSum[i];
    })
  }

  
//CHART VARIABLES

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // Increase this value to make the labels larger
          },
          color: 'whitesmoke', // Customize the label color (optional)
        },
      },
    },
  };

  public pieChartLabels = [['مصروفات شخصية'], ['زكاة مال'], ['مصاريف بيت']];

  public pieChartDatasets = [
    {
      data: this.totalSum,
    },
  ];

  public pieChartLegend = true;
  public pieChartPlugins = [];


  single = [
    {
      "name": "مصروفات شخصية",
      "value": 0
    },
    {
      "name": "زكاة مال",
      "value": 0
    },
    {
      "name": "مصاريف بيت",
      "value": 0
    },
  
  ];
  positionLegend:LegendPosition=LegendPosition.Below

  
  view: [number, number] = [window.innerWidth * 0.5, 400]; // Default width and height

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateChartSize();
  }

  updateChartSize() {
    const width = window.innerWidth ; // Adjust as per your requirement
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
  labels= [
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
  ]
}