import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../services/expense.service';
import { Users } from '../../interfaces/users';
import { PasswordsMatchValidator } from '../../validators/passConfirm';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '1000ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  returnUrl!: string;
  constructor(
    private fb: FormBuilder,
    public expenseService: ExpenseService,
    private userService: UsersService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/),
          ],
        ],
        confirmPass: ['', Validators.required],
      },
      {
        validators: PasswordsMatchValidator('password', 'confirmPass'),
      }
    );
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'];
  }
  userReg!: Users;
  sumbitted: boolean = false;

  get fc() {
    return this.registerForm.controls;
  }
  @ViewChild('regBtnEl') regBtn!: ElementRef;
  submit() {
    this.sumbitted = true;
    if (this.registerForm.valid) {
      this.regBtn.nativeElement.classList.add('loading');
      this.userReg = {
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      };
      this.userService.registerUser(this.userReg).subscribe({
        next: () => {
          this.regBtn.nativeElement.classList.remove('loading');
          this.registerForm.disable();
          this.router.navigateByUrl(this.returnUrl);
          this.toastr.success('اهلا يا معلم 😎', 'تم انشاء حساب جديد');
        },
        error: (err) => {
          this.regBtn.nativeElement.classList.remove('loading');

          this.toastr.error(err.error, 'لم يتم التسجيل');
        },
      });
    } else {
      return;
    }
  }

  preventAction(event: ClipboardEvent): void {
    event.preventDefault();
  }
}
