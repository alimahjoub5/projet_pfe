import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user-service.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
    private userService: UserService
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

  updateUser(): void {
    if (this.updateForm.valid) {
      const updatedUser: User = this.updateForm.value;
      this.userService.updateUser(updatedUser, this.userId).subscribe(updatedUser => {
        console.log('User updated successfully:', updatedUser);
        this.router.navigate(['user-detail/', this.userId]);
      });
    }
  }
}
