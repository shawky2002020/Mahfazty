import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../../interfaces/expense';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
  
})
export class DashboardComponent implements OnInit,OnChanges {
  expenseForm!: FormGroup;
  returnUrl!: string;
  type: string = '';
  constructor(
    private fb: FormBuilder,
    public expenseService: ExpenseService,
    private toastr: ToastrService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.type=this.fc['type'].value;
  }

  ngOnInit(): void {    
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      subType: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
    });
    this.returnUrl = this.activeRouter.snapshot.queryParams['returnUrl'];
  }

  typeChanged(event:Event){
    const inputElement = event.target as HTMLInputElement;
    this.type = inputElement.value;
  }

  get fc() {
    return this.expenseForm.controls;
  }

  submitForm() {
    if (this.expenseForm.valid) {
      const dateString: Date = this.fc['date'].value;
      const date = new Date(dateString);
      console.log(date);

      let expense: Expense = {
        ...this.expenseForm.value,
        subDate: {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      };
      console.log(expense);

      this.expenseService.addExpense(expense).subscribe({
        next: (res) => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          console.log(err);

          this.toastr.error('العملية فشلت ', 'خطأ');
        },
      });
    } else {
      this.toastr.error('لم يتم التسجيل', 'ادخل كل البيانات');
    }
  }
}
