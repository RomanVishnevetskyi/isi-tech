import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
   users = [
     {
       "id": 1,
       "first_name": "Seymour",
       "last_name": "Book",
       "email": "sbook0@blinklist.com",
       "types": "Admin",
       "username": "sbook0"
     },
     {
       "id": 2,
       "first_name": "Kinsley",
       "last_name": "Kelley",
       "email": "kkelley1@4shared.com",
       "types": "Driver",
       "username": "kkelley1"
     },
     {
       "id": 3,
       "first_name": "Thelma",
       "last_name": "Concklin",
       "email": "tconcklin2@1688.com",
       "types": "Admin",
       "username": "tconcklin2"
     },
     {
       "id": 4,
       "first_name": "Adham",
       "last_name": "Harberer",
       "email": "aharberer3@technorati.com",
       "types": "Admin",
       "username": "aharberer3"
     },
     {
       "id": 5,
       "first_name": "Aindrea",
       "last_name": "Bearns",
       "email": "abearns4@reverbnation.com",
       "types": "Admin",
       "username": "abearns4"
     },
     {
       "id": 6,
       "first_name": "Carney",
       "last_name": "Sandham",
       "email": "csandham5@japanpost.jp",
       "types": "Driver",
       "username": "csandham5"
     },
     {
       "id": 7,
       "first_name": "Beniamino",
       "last_name": "Blowin",
       "email": "bblowin6@wikipedia.org",
       "types": "Admin",
       "username": "bblowin6"
     },
     {
       "id": 8,
       "first_name": "Ruthe",
       "last_name": "Donnan",
       "email": "rdonnan7@china.com.cn",
       "types": "Admin",
       "username": "rdonnan7"
     },
     {
       "id": 9,
       "first_name": "Arman",
       "last_name": "Fancourt",
       "email": "afancourt8@hexun.com",
       "types": "Driver",
       "username": "afancourt8"
     },
     {
       "id": 10,
       "first_name": "Deny",
       "last_name": "Webbe",
       "email": "dwebbe9@msn.com",
       "types": "Admin",
       "username": "dwebbe9"
     },
   ];

  getUsers():Observable<Array<User>> {
    const randomStatusCode = Math.floor(Math.random() * 6) + 1;

    if (randomStatusCode === 1) {
      return new Observable(observer => {
        setTimeout(() => {
          observer.error({ status: 403, message: 'Forbidden' });
        }, 1000);
      });
    }

    else if (randomStatusCode === 2) {
      return new Observable(observer => {
        setTimeout(() => {
          observer.error({ status: 404, message: 'Not Found' });
        }, 1000);
      });
    }

    else {
      return of(this.users).pipe(delay(1000));
    }
  }
}
