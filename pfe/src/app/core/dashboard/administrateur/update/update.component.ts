import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user-service.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update',
  standalone: true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule,ToastModule  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService :MessageService,
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userID');
      this.userService.getUser(Number(this.userId)).subscribe(user => {
        this.updateForm.patchValue(user);
      });
    });
  }
  onCancel(): void {
    // Réinitialiser le formulaire
    this.updateForm.reset();

    this.router.navigate(['/userlist']);
}

  updateUser(): void {
    if (this.updateForm.valid) {
      const updatedUser: User = this.updateForm.value;
      this.userService.updateUser(updatedUser, this.userId).subscribe(updatedUser => {
        console.log('User updated successfully:', updatedUser);
        this.showSuccess();
      });
    }
  }
  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur a été mise à jour avec succès' });
  }
}
