import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user-service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone : true,
  imports : [ProgressSpinnerModule,CommonModule]
})
export class UserDetailComponent implements OnInit {
  userId: number;
  user: User; // Définissez le type de votre utilisateur
  isLoading = false; 

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.getUserDetails(this.userId);
  }

  getUserDetails(userId: number): void {
    this.isLoading = true; // Show spinner before fetching data
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
      this.isLoading = false; // Hide spinner after data retrieval
    });
  }

  printDocument(): void {
    window.print();
  }
}
