import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalPasswordService } from 'src/app/services/modal/modal-password.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

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
      civilite: [this.user.civilite, [Validators.required]],
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
      const finalData = { ...this.user, ...this.userForm.value };
      if (JSON.stringify(finalData) === JSON.stringify(this.user)) {
        Swal.fire({
          title: 'Aucune modification effectuée',
          timer: 1000,
          icon: 'info',
        });
        return;
      } else {
        this.user = finalData;
        this.userService.updateUser(finalData).subscribe(
          (data: any) => {
            Swal.fire({
              title: 'Les modifications ont bien été effectuées',
              timer: 1500,
              confirmButtonText: 'Génial',
              icon: 'success',
            });
          },
          (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Il y a eu un problème lors de votre demande',
              text: 'Veuillez réessayer plus tard',
              timer: 1500,
              confirmButtonText: 'Réessayer',
              icon: 'error',
            });
          }
        );
      }
    } else {
      console.log('Ready to update');
      this.message = 'Enregistrer';
      this.updating = true;
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
