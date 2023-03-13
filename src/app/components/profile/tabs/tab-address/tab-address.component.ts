import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

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
      const finalData = { ...this.user, ...this.addressForm.value };
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
            console.log(data);
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
