import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsComponent } from "../components/tickets/tickets.component";
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TicketsComponent, NavbarComponent]
})
export class AppComponent {
  title = 'frontPFE';
}
