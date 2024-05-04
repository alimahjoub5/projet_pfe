import { Component, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';   

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [SplitterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  panel2Resizable: boolean = false;
  panel3Resizable: boolean = false;
  panel4Resizable: boolean = false;
    // Add more messages as needed
  constructor() { }

  ngOnInit(): void {
  }
}
