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
import { TabOneComponent } from './components/profile/tabs/tab-one/tab-one.component';
import { TabTwoComponent } from './components/profile/tabs/tab-two/tab-two.component';
import { TabThreeComponent } from './components/profile/tabs/tab-three/tab-three.component';
import { TabFourComponent } from './components/profile/tabs/tab-four/tab-four.component';

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
    TabOneComponent,
    TabTwoComponent,
    TabThreeComponent,
    TabFourComponent,
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
