import { Component , OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MenuItem} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RouterModule} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
@Component({
  selector: 'app-userlist',
  
  standalone: true,
  imports: [FormsModule,
    ButtonModule,
     ReactiveFormsModule, 
    AutoCompleteModule,
    TableModule,DialogModule,
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
