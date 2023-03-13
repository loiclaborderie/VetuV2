import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ModalPasswordService } from 'src/app/services/modal/modal-password.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { changePasswordResponse } from 'src/app/_interfaces/changePasswordResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PasswordModalComponent {
  @Input() id?: string;
  isOpen = false;
  private element: any;
  data: any;
  passwordChangeMsg!: changePasswordResponse;
  passwordForm!: FormGroup;
  newpasswordForm!: FormGroup;
  submitted = false;
  submittedGood = false;
  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;

  constructor(
    private modalPasswordService: ModalPasswordService,
    private el: ElementRef,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.element = el.nativeElement;
  }

  passInfo() {
    Swal.fire({
      icon: 'info',
      text: 'Votre mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, un chiffre et un caractère spécial.',
    });
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

  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalPasswordService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
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

  ngOnDestroy() {
    // remove self from modal service
    this.modalPasswordService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    this.element.style.display = 'block';
    console.log(this.element);
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }

  confirmPasswordChange() {
    console.log('confirmé');
    this.submittedGood = true;
    this.submitted = true;
    if (this.passwordForm.invalid) {
      console.log('form invalid');
      return;
    }
    console.log(this.userService.userId);
    const form = document.querySelector('form.password') as HTMLFormElement;
    const formData = new FormData(form) as any;
    const data: { [key: string]: any } = Object.fromEntries(formData.entries());
    console.log(data);
    this.authService
      .changePassword(data)
      .subscribe((data: changePasswordResponse) => {
        if (data.status === false) {
          console.log(data);
          Swal.fire({
            icon: 'error',
            text: data.message,
            title: 'Veuillez réessayer',
            timer: 1500,
          });
          this.submittedGood = false;
        } else {
          // this.cancelPasswordChange();
          this.passwordChangeMsg = data;
          console.log(data);
          Swal.fire({
            icon: 'success',
            text: data.message,
            title: 'Modification effectuée',
            timer: 1500,
          });
          setTimeout(() => {
            this.close();
          }, 1500);
        }
      });
  }

  get passForm() {
    return this.passwordForm.controls;
  }
  get newpassword() {
    return (<FormGroup>this.passwordForm.get('newpasswordForm')).controls;
  }
}
