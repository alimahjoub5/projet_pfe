import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TicketsComponent } from "../components/tickets/tickets.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path:'', component: TicketsComponent }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
