import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailledComponent } from './components/product-detailled/product-detailled.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { alreadyAuthGuard } from './guard/alreadyauth.guard';
import { AllResultsComponent } from './components/all-results/all-results.component';

const routes: Routes = [
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
  { path: 'products/categorie/:category', component: AllResultsComponent },
  {
    path: 'products/categorie/:category/:genre',
    component: AllResultsComponent,
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
