import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AssigneeService } from '../../services/AssigneeService';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss'],
  standalone:true,
  imports: [
    ReactiveFormsModule,AutoCompleteModule // Correction ici : imports est un tableau
  ]
})


export class AjouterComponent implements OnInit {
selectedOption: any;
options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
];
filterCountry($event: any) {
throw new Error('Method not implemented.');
}
  ticketForm: FormGroup;
  assignees: any[] = [];
product: any;
filteredCountries: any;
formGroup: any;


  constructor(
    private fb: FormBuilder, 
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      subject: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      assigneeID: [''],




    });
    
  }

 

}
