import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalPasswordService } from 'src/app/services/modal/modal-password.service';
import { UserService } from 'src/app/services/user/user.service';

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
  userForm!: FormGroup;
  submitted = false;
  submittedGood = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    protected modalPasswordService: ModalPasswordService
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

  cancel() {
    this.updating = false;
    this.userForm.reset(this.user); // reset the form fields to their original values
    this.message = 'Modifier';
  }

  get form() {
    return this.userForm.controls;
  }

  testConsole() {
    console.log(this.user);
  }
}
