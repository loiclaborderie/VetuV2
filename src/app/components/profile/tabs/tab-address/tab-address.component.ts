import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tab-address',
  templateUrl: './tab-address.component.html',
  styleUrls: ['./tab-address.component.scss'],
})
export class TabAddressComponent {
  @Input()
  user: any;
  addressForm!: FormGroup;
  updating = false;
  message = 'Modifier';
  successMsg: string = '';
  failureMsg: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      adresse: [
        this.user.adresse,
        [
          Validators.required,
          Validators.pattern(/^[\d\w\s-,'àâçéèêëîïôûùüÿñ]{20,150}$/),
        ],
      ],
      ville: [this.user.ville, [Validators.required, Validators.minLength(2)]],
      codePostal: [
        this.user.codePostal,
        [Validators.required, Validators.pattern(/^\d{5}$/)],
      ],
    });
  }

  updateInfos() {
    if (this.updating) {
      console.log('Updating infos');
      this.updating = false;
      this.message = 'Modifier';
      const form = document.querySelector('form') as HTMLFormElement;
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

  cancel() {
    this.updating = false;
    this.addressForm.reset(this.user); // reset the form fields to their original values
    this.message = 'Modifier';
  }

  get form() {
    return this.addressForm.controls;
  }
  testConsole() {
    console.log(this.user);
  }
}
