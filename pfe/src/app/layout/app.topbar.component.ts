import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})

export class AppTopBarComponent {
name: string = this.authservice.getUsername();


    logout(): void {
        console.log('Déconnexion en cours...');
        this.authService.clearAuthData();
        this.router.navigate(['/login']);
      }
      

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(private authservice: AuthService ,public layoutService: LayoutService, private authService: AuthService,private route:ActivatedRoute,private router:Router) {
 
    }

}

