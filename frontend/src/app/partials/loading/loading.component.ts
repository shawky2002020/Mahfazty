import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { UsersService } from '../../services/users.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  animations: [
    trigger('zoomInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('700ms ease-in', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ])
  ]
    
})
export class LoadingComponent implements OnInit {

  isLoading!: boolean;
  constructor(public loadingService: LoadingService,public userService : UsersService) {
    loadingService.showLoading()
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });


   }

  ngOnInit(): void {
  }

}
