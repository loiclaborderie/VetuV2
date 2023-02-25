import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: any;

  ngOnInit(): void {
    this.userService.getUser().subscribe((data: any) => {
      if (data === null) {
        this.router.navigate(['/login']);
      }
      this.user = data;
    });
  }

  constructor(private userService: UserService, private router: Router) {}
}
