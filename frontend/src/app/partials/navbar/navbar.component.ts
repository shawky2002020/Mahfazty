import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
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
export class NavBarComponent implements OnInit, AfterViewInit {
  public currentUser?: userResponse;
  addBool = false;
  navShow = false;
  constructor(
    private toast: ToastrService,
    private expenseService: ExpenseService,
    private userService: UsersService,
    private router :Router
  ) {}
  @ViewChild ('overLayEl') overLayEl!:ElementRef;
  ngAfterViewInit(): void {
    
  }
  @ViewChild ('navIconEl') navIcon!:ElementRef;
  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.currentUser = newUser;
    });
  }
  showNav() {
    this.navIcon.nativeElement.classList.toggle('active');
    this.navShow =!this.navShow;
    this.overLayEl.nativeElement.classList.toggle('active');
  }
    close(){
    this.navIcon.nativeElement.classList.remove('active');
    this.navShow=false;
    this.overLayEl.nativeElement.classList.remove('active');
  }
  showAddList() {
    this.addBool = !this.addBool;
  }
  logout() {
    this.userService.logout();
  }
  }