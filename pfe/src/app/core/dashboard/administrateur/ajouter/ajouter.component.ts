import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule,  Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/dashboard/services/user-service.service';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss'],
  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule  ]
})
export class AjouterComponent implements OnInit {
  userForm: FormGroup;
  roles: any[]; // Define roles array
  constructor(private formBuilder: FormBuilder, private userService: UserService) { 



    this.roles = [
      { label: 'Admin', value: 'Admin' },
      { label: 'Technician', value: 'Technician' },
      { label: 'Manager', value: 'Manager' }
    ];

    // Initialize form with FormBuilder
    this.userForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Email: [''],
      Username: [''],
      Password: [''],
      Role: [''],
    });
  }



  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Role: ['', Validators.required],
      Active: [true]
    });
  }
  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

   // Créer une nouvelle instance de l'objet User en extrayant les valeurs du formulaire
   const userData = this.userForm.value;
   const user: User = {
     FirstName: userData.FirstName,
     LastName: userData.LastName,
     Email: userData.Email,
     Username: userData.Username,
     Password: userData.Password,
     Role: userData.Role,
     Active: userData.Active,
     CreatedOn: new Date() // Définir la date et l'heure actuelles comme CreatedOn
     ,

     UserID: null,
     CreatedBy: null,
     ModifiedOn: undefined,
     ModifiedBy: null
   };
    this.userService.addUser(user)
      .subscribe(
        response => {
          console.log('User added successfully:', response);
          // Réinitialiser le formulaire après l'ajout réussi
          this.userForm.reset();
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
  }
}
