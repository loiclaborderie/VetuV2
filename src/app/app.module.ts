import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { SignupComponent } from './components/signup/signup.component';
import { ModalComponent } from './components/modal/modal.component';
import { PasswordModalComponent } from './components/password-modal/password-modal.component';
import { AllResultsComponent } from './components/all-results/all-results.component';
import { FinalizeOrderComponent } from './components/finalize-order/finalize-order.component';
import { LoopPipe } from './pipes/loop.pipe';
import { ProductComponent } from './components/placeholders/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
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
    SignupComponent,
    ModalComponent,
    PasswordModalComponent,
    AllResultsComponent,
    FinalizeOrderComponent,
    LoopPipe,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatStepperModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
