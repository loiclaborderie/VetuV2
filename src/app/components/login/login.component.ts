import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';
import { Token } from 'src/app/_interfaces/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
  submittedGood = false;
  errormsg = '';

  // passwordPatternValidator(
  //   control: AbstractControl
  // ): { [key: string]: boolean } | null {
  //   const pattern =
  //     /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]?[^@$!%*?&]{0,4}$)(?!.*\s).{8,25}$/;

  //   if (control.value && !pattern.test(control.value)) {
  //     return { passwordPattern: true };
  //   }

  //   return null;
  // }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit(): void {
    this.submitted = true;
    this.submittedGood = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(email, password);
      this.authService.login(email, password).subscribe(
        (data: Token) => {
          localStorage.setItem('user', JSON.stringify(data.userId));
          this.tokenService.saveToken(data.token);
          this.router.navigate(['/profile']);
        },
        (err: any) => {
          this.submittedGood = false;
          this.submitted = false;
          console.log(err);
          this.errormsg = 'Votre email ou mot de passe sont incorrects';
          this.loginForm.patchValue({ password: '' });
        }
      );
    } else {
      console.log('Form is invalid');
      this.submittedGood = false;
    }
  }

  get form() {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}
}
