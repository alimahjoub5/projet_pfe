import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  messages: any[] = [
    { content: 'Hello!', type: 'received', time: new Date() },
    { content: 'Hi there!', type: 'sent', time: new Date() }
    // Add more messages as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
