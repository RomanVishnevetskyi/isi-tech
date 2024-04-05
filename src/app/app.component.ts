import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { Observable } from 'rxjs';
import { Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private commonService: CommonService,
              private router: Router) {
  }
  // displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'type'];
  // users!:any

  ngOnInit() {
    this.router.navigate([''])
    // this.commonService.getUsers().subscribe(
    //   (users) => {
    //     if (users) {
    //       this.users = users;
    //     }
    //   },
    //   (error) => {
    //     if (error.status === '403'|| '404') {
    //       this.router.navigate(['error'])
    //     }
    //
    //     console.error('An error occurred while fetching users:', error);
    //     // Дополнительная логика обработки ошибок, если это необходимо
    //   }
    //   )
  }
}
