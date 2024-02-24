import { Component , OnInit } from '@angular/core';
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
  selector: 'app-userlist',
  
  standalone: true,
  imports: [TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
 
})
export class UserlistComponent {
  customers = [
    { id: 1, name: 'John Doe', country: { code: 'US', name: 'United States' }, representative: { name: 'Alice', image: 'alice.jpg' }, status: 'qualified' },
    { id: 2, name: 'Hane Smith', country: { code: 'CA', name: 'Canada' }, representative: { name: 'Bob', image: 'bob.jpg' }, status: 'unqualified' },
    // Ajoutez plus de données clients au besoin
  ];
      items: MenuItem[];

selectedCustomers: any;

}
