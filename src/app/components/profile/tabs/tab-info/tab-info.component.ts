import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { changePasswordResponse } from 'src/app/_interfaces/changePasswordResponse';

@Component({
  selector: 'app-tab-info',
  templateUrl: './tab-info.component.html',
  styleUrls: ['./tab-info.component.scss'],
})
export class TabInfoComponent {
  @Input()
  user!: any;
  updating = false;
  message = 'Modifier';
  successMsg: string = '';
  failureMsg: string = '';
  passwordChange: boolean = false;
  passwordChangeMsg!: changePasswordResponse;
  userForm!: FormGroup;
  passwordForm!: FormGroup;
  newpasswordForm!: FormGroup;
  submitted = false;
  submittedGood = false;
  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;

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

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('confirmNewPassword')?.value;
    if (pass === confirmPass) {
      return null;
    } else {
      group.get('confirmNewPassword')?.setErrors({ ConfirmPassword: true });
      return { notSame: true };
    }
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.email, Validators.required]],
      nom: [this.user.nom, [Validators.required, Validators.minLength(3)]],
      prenom: [
        this.user.prenom,
        [Validators.required, Validators.minLength(3)],
      ],
      pseudo: [
        this.user.pseudo,
        [Validators.required, Validators.minLength(3)],
      ],
      telephone: [
        this.user.telephone,
        [Validators.pattern(/^(?:\+\d{2,3}\s)?\d{8,}(?:\s\d{2,3})?$/)],
      ],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      newpasswordForm: this.fb.group(
        {
          newPassword: [
            '',
            [Validators.required, this.passwordPatternValidator],
          ],
          confirmNewPassword: [''],
        },
        { validators: this.checkPasswords }
      ),
    });
  }

  updateInfos() {
    if (this.updating) {
      console.log('Updating infos');
      this.updating = false;
      this.message = 'Modifier';
      const form = document.querySelector('form.data') as HTMLFormElement;
      const formData = new FormData(form) as any;
      const data: { [key: string]: any } = Object.fromEntries(
        formData.entries()
      );
      console.log(data);
      const finalData = { ...this.user, ...data };
      this.user = finalData;
      this.userService.updateUser(finalData).subscribe(
        (data: any) => {
          console.log(data);
          this.successMsg = data.message;
        },
        (error: any) => {
          console.log(error);
          this.failureMsg = 'Il y a eu un problème lors de votre demande';
        }
      );
    } else {
      console.log('Ready to update');
      this.message = 'Enregistrer';
      this.updating = true;
      this.successMsg = '';
      this.failureMsg = '';
    }
  }

  confirmPasswordChange() {
    this.submittedGood = true;
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    console.log(this.userService.userId);
    alert('this worked');
    const form = document.querySelector('form.password') as HTMLFormElement;
    const formData = new FormData(form) as any;
    const data: { [key: string]: any } = Object.fromEntries(formData.entries());
    console.log(data);
    this.authService
      .changePassword(data)
      .subscribe((data: changePasswordResponse) => {
        if (data.status === false) {
          this.passwordChangeMsg = data;
          this.passwordChange = true;
          this.submittedGood = false;
        } else {
          this.cancelPasswordChange();
          this.passwordChangeMsg = data;
        }
      });

    // const finalData = { ...this.user, ...data };
    // this.user = finalData;
    // this.userService.updateUser(finalData).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.successMsg = data.message;
    //     this.passwordChange = false;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     this.failureMsg = 'Il y a eu un problème lors de votre demande';
    //   }
    // );
  }

  cancelPasswordChange() {
    this.passwordChange = false;
    this.passwordForm.reset();
    this.submittedGood = false;
    this.submitted = false;
  }

  cancel() {
    this.updating = false;
    this.userForm.reset(this.user); // reset the form fields to their original values
    this.message = 'Modifier';
  }

  get form() {
    return this.userForm.controls;
  }
  get passForm() {
    return this.passwordForm.controls;
  }
  get newpassword() {
    return (<FormGroup>this.passwordForm.get('newpasswordForm')).controls;
  }

  testConsole() {
    console.log(this.user);
  }
}
