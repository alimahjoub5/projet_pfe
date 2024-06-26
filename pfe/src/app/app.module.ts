import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './core/services/user-service.service';

import {ButtonModule} from 'primeng/button';
import { TicketService } from './core/services/tickets.service';
import { EquipmentTypeService } from './core/services/equipements.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './core/services/intercepteur/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { UsersTechnicianGroupsService } from './core/services/user-tech.service';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [BrowserModule,FormsModule,AppRoutingModule, AppLayoutModule,HttpClientModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        UserService,
        TicketService,
        EquipmentTypeService,
        NgModule,
        BrowserAnimationsModule,
        MessageService,
        AuthService,
        UsersTechnicianGroupsService,
        FullCalendarModule,

        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Enregistrez l'intercepteur
     
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

