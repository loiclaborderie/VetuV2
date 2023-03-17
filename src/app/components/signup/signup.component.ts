import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Token } from 'src/app/_interfaces/token';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  submit1 = false;
  submit2 = false;
  submit3 = false;
  errorMsg: string = '';
  userForm!: FormGroup;
  alertMsg: any = '';
  isLinear = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private location: Location
  ) {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  @ViewChild('stepper') stepper!: MatStepper;

  goBack() {
    this.location.back();
  }

  passwordPatternValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const pattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]?[^@$!%*?&]{0,4}$)(?!.*\s).{8,25}$/;

    if (control.value && !pattern.test(control.value)) {
      return { passwordPattern: true };
    }

    return null;
  }

  confirmPasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const userForm = control.parent;
    if (!userForm) {
      return null;
    }

    const passwordControl = userForm.get('password');
    if (!passwordControl) {
      return null;
    }
    const password: string | null = passwordControl.value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { confirmPassword: true };
    }
    return null;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      basic: this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, this.passwordPatternValidator]],
        confirmPassword: [
          '',
          [Validators.required, this.confirmPasswordValidator],
        ],
      }),
      contact: this.fb.group({
        civilite: ['', [Validators.required]],
        nom: ['', [Validators.required, Validators.minLength(3)]],
        prenom: ['', [Validators.required, Validators.minLength(3)]],
        pseudo: ['', [Validators.required, Validators.minLength(3)]],
        telephone: [
          '',
          [Validators.pattern(/^(?:\+\d{2,3}\s)?\d{8,}(?:\s\d{2,3})?$/)],
        ],
      }),
      address: this.fb.group({
        adresse: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\d\w\s-,'àâçéèêëîïôûùüÿñ]{12,150}$/),
          ],
        ],
        ville: ['', [Validators.required, Validators.minLength(2)]],
        code_postal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      }),
    });
  }

  submit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      let forms = this.userForm.value;
      let finalForm = Object.assign(
        {},
        forms.basic,
        forms.contact,
        forms.address
      );
      const email = finalForm.email;
      const password = finalForm.password;
      console.log(finalForm, email, password);
      this.authService.register(finalForm).subscribe(
        (data: any) => {
          if (data.status === false) {
            Swal.fire({
              title: 'Il y a eu une erreur',
              text: data.message,
              timer: 1000,
              icon: 'error',
            });
            this.stepper.selectedIndex = 0;
            this.basicForm.get('email')!.reset();
            this.basicForm.get('email')!.setErrors({ already: true });
            return;
          }
          console.log(data);
          Swal.fire({
            title: 'Votre compte a bien été créé',
            text: 'Vous allez être redirigé',
            timer: 1000,
            icon: 'success',
          });

          this.authService.login(email, password).subscribe(
            (data: Token) => {
              localStorage.setItem('user', JSON.stringify(data.userId));
              this.tokenService.saveToken(data.token);
              this.router.navigate(['/profile']);
            },
            (err: any) => {
              Swal.fire(
                'Erreur lors de votre connexion',
                'Veuillez réessayer plus tard',
                'error'
              );
            }
          );
        },
        (err: any) => {
          Swal.fire(
            'Il y a eu une erreur lors de votre inscription',
            'Veuillez réessayer',
            'error'
          );
        }
      );
    } else {
      this.submit3 = true;
    }
  }

  get form() {
    return this.userForm.controls;
  }
  get basicForm() {
    return this.userForm.get('basic') as FormGroup;
  }
  get contactForm() {
    return this.userForm.get('contact') as FormGroup;
  }
  get addressForm() {
    return this.userForm.get('address') as FormGroup;
  }
}
