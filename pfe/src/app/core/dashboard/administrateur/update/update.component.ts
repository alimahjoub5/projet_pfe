import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user-service.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  user: User = new User()!;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userID');
      this.userService.getUser(Number(this.userId)).subscribe(user => {
        this.user = user;
      });
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user,this.userId).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
      // Rediriger vers la page de détails de l'utilisateur mis à jour
      this.router.navigate(['user-detail/', this.userId]);
    });
  }


}