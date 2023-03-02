import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailledComponent } from './components/product-detailled/product-detailled.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { alreadyAuthGuard } from './guard/alreadyauth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: AllProductsComponent },
  { path: 'login', component: LoginComponent, canActivate: [alreadyAuthGuard] },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [alreadyAuthGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products/:reference', component: ProductDetailledComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
