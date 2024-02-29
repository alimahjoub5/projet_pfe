import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/dashboard/services/user-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: number;
  user: User; // Définissez le type de votre utilisateur

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.getUserDetails(this.userId);
  }

  getUserDetails(userId: number): void {
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }
  printDocument(): void {
    window.print();
  }
}
