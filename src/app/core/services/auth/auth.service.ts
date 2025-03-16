import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { usersI } from '../../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(reqBody: { username: string, password: string }): Observable<any> {
    if (reqBody.username && reqBody.password) {
      return new Observable(observer => {
        setTimeout(() => {
          observer.next({
            message: 'success',
            user: {
              username: reqBody.username,
              age: 20,
              isLoggedIn: true
            }
          });
          observer.complete();
        }, 2000);
      });
    } else {
      return new Observable(observer => {
        setTimeout(() => {
          observer.next({ message: 'fail' });
          observer.complete();
        }, 2000);
      });
    }
  }

  register(user: usersI): Observable<any> {
    if (user)
      return of({ message: 'success', user })

    else
      return of({ message: 'fail' })
  }
}
