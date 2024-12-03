import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../services/expense.service';
import { UsersService } from '../../services/users.service';
import { userResponse, Users } from '../../interfaces/users';
import { Router } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',

})
export class NavBarComponent implements OnInit {
  public currentUser?: userResponse;
  addBool = false;
  navShow = false;
  constructor(
    private toast: ToastrService,
    private expenseService: ExpenseService,
    private userService: UsersService,
    private router :Router
  ) {}
  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.currentUser = newUser;
    });
  }
  showNav() {
    this.addBool = false;
    this.navShow = !this.navShow;
  }
  showAddList() {
    this.addBool = !this.addBool;
  }
  logout() {
    this.userService.logout();
  }
  }