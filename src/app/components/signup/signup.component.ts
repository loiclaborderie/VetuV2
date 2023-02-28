import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.submittedGood = true;
    if (this.userForm.valid) {
      // const { email, password } = this.loginForm.value;
      // console.log(email, password);
      // this.authService.login(email, password).subscribe(
      //   (data: Token) => {
      //     localStorage.setItem('user', JSON.stringify(data.userId));
      //     this.tokenService.saveToken(data.token);
      //     this.router.navigate(['/profile']);
      //   },
      //   (err: any) => {
      //     this.submittedGood = false;
      //     this.submitted = false;
      //     console.log(err);
      //     this.errormsg = 'Votre email ou mot de passe sont incorrects';
      //     this.loginForm.patchValue({ password: '' });
      //   }
      // );
      alert('le form est valide');
    } else {
      console.log('Form is invalid');
      this.submittedGood = false;
    }
  }

  get form() {
    return this.userForm.controls;
  }
}
