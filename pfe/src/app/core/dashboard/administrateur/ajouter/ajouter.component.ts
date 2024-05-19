import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule,  Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user-service.service';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss'],
  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule,ToastModule  ]
})
export class AjouterComponent implements OnInit {
  userForm: FormGroup;
  roles: any[]; // Define roles array
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private authservice : AuthService,
    private messageService :MessageService
  ) { 



    this.roles = [
      { label: 'Admin', value: 'Admin' },
      { label: 'Technician', value: 'Technician' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Magasinier', value: 'stockHolder'}
      
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
     CreatedBy: Number(this.authservice.getUserID()),
     ModifiedOn: undefined,
     ModifiedBy: null
   };
    this.userService.addUser(user)
      .subscribe(
        response => {
          console.log('User added successfully:', response);
          // Réinitialiser le formulaire après l'ajout réussi
          this.userForm.reset();
           // Afficher le message d'erreur retourné par l'API
           this.messageService.add({severity:'success', summary:'success', detail:'error.error.message'});
 

        },
        error => {
 // Afficher le message d'erreur retourné par l'API
 this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
}
      );
  }
}
