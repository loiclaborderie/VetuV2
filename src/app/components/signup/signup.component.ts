import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Token } from 'src/app/_interfaces/token';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  submitted = false;
  submittedGood = false;
  errorMsg: string = '';
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

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
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, this.passwordPatternValidator]],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator],
      ],
      civilite: ['', [Validators.required]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      telephone: [
        '',
        [Validators.pattern(/^(?:\+\d{2,3}\s)?\d{8,}(?:\s\d{2,3})?$/)],
      ],
      adresse: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\d\w\s-,'àâçéèêëîïôûùüÿñ]{20,150}$/),
        ],
      ],
      ville: ['', [Validators.required, Validators.minLength(2)]],
      code_postal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.submittedGood = true;
    if (this.userForm.valid) {
      alert('le form est valide');
      console.log(JSON.stringify(this.userForm.value));
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;
      this.authService.register(this.userForm.value).subscribe(
        (data: any) => {
          console.log('Votre inscription est un succès');
          this.submittedGood = true;
          this.submitted = false;
          console.log('Vous allez normalement être rédirigé');
          this.authService.login(email, password).subscribe(
            (data: Token) => {
              console.log('Vous êtes connecté');
              localStorage.setItem('user', JSON.stringify(data.userId));
              this.tokenService.saveToken(data.token);
              this.router.navigate(['/profile']);
            },
            (err: any) => {
              console.log('Il y a eu une erreur lors de votre connexion');
              this.submittedGood = false;
              this.submitted = false;
              console.log(err);
            }
          );
        },
        (err: any) => {
          console.log('Il y a eu une erreur lors de votre inscription');
          this.submittedGood = false;
          this.submitted = false;
          this.errorMsg = 'Il y a eu une erreur lors de votre inscription';
        }
      );
      // Ca va servir à ensuite se connecter et puis à le rediriger vers son profil
    } else {
      console.log('Form is invalid');
      this.submittedGood = false;
    }
  }

  get form() {
    return this.userForm.controls;
  }
}
