import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductDetailledComponent } from './components/product-detailled/product-detailled.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/loading/loading.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { TabInfoComponent } from './components/profile/tabs/tab-info/tab-info.component';
import { TabOrdersComponent } from './components/profile/tabs/tab-orders/tab-orders.component';
import { TabAddressComponent } from './components/profile/tabs/tab-address/tab-address.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    OneProductComponent,
    ProductDetailledComponent,
    LoadingComponent,
    NavbarComponent,
    CartComponent,
    ProfileComponent,
    LoginComponent,
    TabInfoComponent,
    TabOrdersComponent,
    TabAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
