import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { LayoutService } from "./service/app.layout.service";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(private layoutService: LayoutService, private authService: AuthService) { }

  ngOnInit() {
    const userRole = this.authService.getRole();

    this.model = [
      {
        label: 'Main',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
        ]
      },
    ];

    if (userRole === 'Admin') {
      this.model.push(
        {
          label: 'Administrateur',
          items: [
            { label: 'Utilisateurs', icon: 'pi pi-fw pi-user', routerLink: ['/userlist'] },
            { label: 'Groupes', icon: 'pi pi-fw pi-users', routerLink: ['/groupelist'] },
            { label: "Profil", icon: 'pi pi-fw pi-id-card', routerLink: ['/profil'] },
          ]
        }
      );
    }

    if (userRole === 'Manager') {
      this.model.push(
        {
          label: 'Calendrier',
          items: [
            { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'] },
          ]
        },
        {
          label: 'Intervention',
          items: [
            { label: 'Créer une intervention', icon: 'pi pi-fw pi-plus', routerLink: ['/create'] },
            { label: 'Liste des interventions', icon: 'pi pi-fw pi-list', routerLink: ['/list'] },
            { label: "L'historique des interventions", icon: 'pi pi-fw pi-file-o', routerLink: ['/archive'] },
            { label: "Planifier des interventions", icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/planifie'] },
          ]
        },
        {
          label: 'Outils',
          items: [
            { label: 'Équipement', icon: 'pi pi-fw pi-desktop', routerLink: ['/eqlist'] },
            { label: 'Groupes de techniciens', icon: 'pi pi-fw pi-users', routerLink: ['/listt'] }
          ]
        },
        {
          label: 'Gestion de Stock',
          items: [
            { label: 'Gérer les fournisseurs', icon: 'pi pi-fw pi-truck', routerLink: ['/fournisseur'] },
            { label: 'Gérer le stock', icon: 'pi pi-fw pi-briefcase', routerLink: ['/stocks'] },
          ]
        }
      );
    }

    if (userRole === 'stockHolder') {
      this.model.push({
        label: 'Gestion de Stock',
        items: [
          { label: 'Gérer les fournisseurs', icon: 'pi pi-fw pi-truck', routerLink: ['/fournisseur'] },
          { label: 'Gérer les commandes', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/commande'] },
          { label: 'Gérer les pièces', icon: 'pi pi-fw pi-cog', routerLink: ['/piecelist'] },
          { label: 'Gérer le stock', icon: 'pi pi-fw pi-briefcase', routerLink: ['/stocks'] },
          { label: 'Gérer les locaux', icon: 'pi pi-fw pi-home', routerLink: ['/location'] },
        ]
      });
    }

    if (userRole === 'Technician') {
      this.model.push(
        {
          label: 'Calendrier',
          items: [
            { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'] },
          ]
        },
        {
          label: 'Groupes',
          items: [
            { label: 'Consulter le Groupe', icon: 'pi pi-fw pi-users', routerLink: ['/membre'] },
          ]
        },
        {
          label: 'Gestion des interventions',
          items: [
            { label: 'Liste des interventions', icon: 'pi pi-fw pi-list', routerLink: ['/list'] },
            { label: "L'historique des interventions", icon: 'pi pi-fw pi-archive', routerLink: ['/archive'] },
          ]
        },
        {
          label: 'Gestion de Stock',
          items: [
            { label: 'Gérer l\'utilisation des pièces', icon: 'pi pi-fw pi-sitemap', routerLink: ['/utilisation'] }
          ]
        }
      );
    }
  }
}
