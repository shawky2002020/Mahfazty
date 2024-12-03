import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../services/expense.service';
import { Users } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
    
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!:string;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router : Router,
    private activeRoute : ActivatedRoute,
    private userService: UsersService,
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/),
        ],
      ],
    });
    this.returnUrl=this.activeRoute.snapshot.queryParams['returnUrl'];
  }
  currentUser!: Users;
  sumbitted: boolean = false;

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.sumbitted = true;
    if (this.loginForm.valid) {
      this.currentUser = {
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      };
      this.userService.loginUser(this.currentUser).subscribe({
        next: (res) => {
          this.loginForm.disable();
          this.toastr.success('نورت يا غنى 😎','تم التسجيل ينجاح')
          this.router.navigateByUrl(this.returnUrl);
        },
        error(err) {
          console.log(err.message);
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
