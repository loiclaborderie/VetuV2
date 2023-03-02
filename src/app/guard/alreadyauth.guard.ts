import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class alreadyAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.userService.userId) {
      console.log(this.userService.userId);
      console.log('can access');
      return true; // Allow access to the route
    } else {
      console.log(this.userService.userId);
      console.log('cannot access');
      this.router.navigate(['/']); // Redirect to the login page
      return false; // Do not allow access to the route
    }
  }
}
