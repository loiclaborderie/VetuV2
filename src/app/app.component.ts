import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavbar = true;

  onActivate(component: any) {
    // hide navbar if component is profile
    this.showNavbar = !(
      (component instanceof ProfileComponent)
      // || component instanceof CartComponent
    );
  }
}
