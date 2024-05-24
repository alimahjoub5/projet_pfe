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
          { label: 'Chat', icon: 'pi pi-fw pi-comments', routerLink: ['/chat'] }
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
          { label: 'Société', icon: 'pi pi-fw pi-building', routerLink: ['/listsociete'] },
          { label: "Profils", icon: 'pi pi-fw pi-id-card', routerLink: ['/profil'] },
          { label: "File d'attente des notifications", icon: 'pi pi-fw pi-envelope', routerLink: ['/'] }
        ]
      });
    }

    if (userRole === 'Manager') {
      this.model.push(
        {
          label:'Calendrier',
          items:[
            { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'] },
  
          ]
        },
        {
         label: 'Intervention',
          items: [
          { label: 'Créer une intervention', icon: 'pi pi-fw pi-plus', routerLink: ['/create'] },
          { label: 'Liste des interventions', icon: 'pi pi-fw pi-list', routerLink: ['/list'] },
          { label: "Suivre l'état de l'intervention", icon: 'pi pi-fw pi-info', routerLink: ['/status'] },
          { label: "L'archive des interventions", icon: 'pi pi-fw pi-archive', routerLink: ['/archive'] }
          ]
        },
        {
        label: 'Outils',
        items: [
          { label: 'Équipement', icon: 'pi pi-fw pi-desktop', routerLink: ['/eqlist'] },
          { label: 'Priorité', icon: 'pi pi-fw pi-sort-amount-up', routerLink: ['/prioritylist'] },
          { label: "Tâches de l'intervention", icon: 'pi pi-fw pi-calendar', routerLink: ['/listtasks'] },
          { label: 'Groupes de techniciens', icon: 'pi pi-fw pi-users', routerLink: ['/listt'] }
        ]
      },
      {
      label: 'Gestion de Stock',
      items: [
        { label: 'Gérer les fournisseurs', icon: 'pi pi-fw pi-truck', routerLink: ['/fournisseur'] },
        { label: 'Gérer les commandes', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/commande'] },
        { label: 'Gérer le stock', icon: 'pi pi-fw pi-briefcase', routerLink: ['/stocks'] },      ]}
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
      this.model.push({
        label:'Calendrier',
        items:[
          { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'] },

        ]
      },
      {
        label:'Groupes',
        items:[
          { label: 'Consulter le Groupe', icon: 'pi pi-fw pi-users', routerLink: ['/groupelist'] },

        ]
      },
      {
        label: 'Gestion des interventions',
        items: [
          { label: 'Créer une intervention', icon: 'pi pi-fw pi-plus', routerLink: ['/create'] },
          { label: 'Liste des interventions', icon: 'pi pi-fw pi-list', routerLink: ['/list'] },
          { label: "Suivre l'état de l'intervention", icon: 'pi pi-fw pi-info', routerLink: ['/status'] },
          { label: "L'archive des interventions", icon: 'pi pi-fw pi-archive', routerLink: ['/archive'] }
        ]
      },
      {
      label: 'Gestion de Stock',
      items: [
      { label: 'Gérer l\'utilisation des pièces', icon: 'pi pi-fw pi-sitemap', routerLink: ['/utilisation'] }
      ]}
    );
    }
  }}
  
 



    


            
            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
            //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
            // },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        
    

