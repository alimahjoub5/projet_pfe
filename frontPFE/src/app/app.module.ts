import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TicketsComponent } from "../components/tickets/tickets.component";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';

const appRoutes: Routes = [
    { path:'', component: TicketsComponent }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
