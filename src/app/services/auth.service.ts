import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { reject } from 'q';

export interface User {
  name: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor() { }

  login(name) {
    if (name== 'user') {
      this.currentUser.next({
        name: 'Dummy User',
        roles: ['user-view','dashboard-content']
      });
    }
    else if (name=='admin') {
      this.currentUser.next({
        name: 'The Admin',
        roles: ['edit-dashboard', 'admin']
      });
    }
  }

  loginTest(name, pw) {
    if (name == 'user' && pw == 'user') {
      this.currentUser.next({
        name: 'Dummy User',
        roles: ['user-view', 'dashboard-content']
      });
    }
    else if (name == 'admin' && pw == 'admin') {
      this.currentUser.next({
        name: 'The Admin',
        roles: ['dashboard-content','edit-dashboard', 'admin']
      });
    }
  }

  getUserSubject() {
    return this.currentUser.asObservable();
  }

  logout() {
    this.currentUser.next(null);
  }

  hasRoles(roles: string[]): boolean {
    for (const oneRole of roles) {
      if(!this.currentUser.value || !this.currentUser.value.roles.includes(oneRole)) {
        return false;
      }
    }

    return true;
  }

}
