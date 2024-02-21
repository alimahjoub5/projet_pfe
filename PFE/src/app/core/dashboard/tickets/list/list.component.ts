import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CustomerService } from 'src/app/demo/service/customer.service';
import {RouterModule} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule
],
  templateUrl: './list.component.html',
  providers: [MessageService, ConfirmationService

],
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
    customers = [
        { id: 1, name: 'John Doe', country: { code: 'US', name: 'United States' }, representative: { name: 'Alice', image: 'alice.jpg' }, status: 'qualified' },
        { id: 2, name: 'Hane Smith', country: { code: 'CA', name: 'Canada' }, representative: { name: 'Bob', image: 'bob.jpg' }, status: 'unqualified' },
        // Ajoutez plus de données clients au besoin
      ];
          items: MenuItem[];

    selectedCustomers: any;

    
    constructor(private customerService: CustomerService,private messageService: MessageService) {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.delete();
                }
            },
            { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
            { separator: true },
            { label: 'Installation', icon: 'pi pi-cog', routerLink: ['/installation'] }
        ];
    }
    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }

    ngOnInit() {
        this.customerService.getCustomersMini().then((data) => (this.customers = data));
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
    
            case 'qualified':
                return 'success';
    
            case 'new':
                return 'info';
    
            case 'negotiation':
                return 'warning';
    
            default:
                return null; // Valeur de retour par défaut
        }
     
    }

    


    
    
}
