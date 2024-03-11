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
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './core/services/user-service.service';
import {ButtonModule} from 'primeng/button';
import { TicketService } from './core/services/tickets.service';
import { EquipmentTypeService } from './core/services/equipements.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { JarwisService } from './core/services/jarwis.service';
import { TokenService } from './core/services/token.service';
import { AfterLoginService } from './core/services/after-login.service';
import { BeforeLoginService } from './core/services/before-login.service';
import { AuthService } from './core/services/auth.service';

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
        JarwisService, 
        TokenService, 
        AuthService,
        AfterLoginService,
        BeforeLoginService
                
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

