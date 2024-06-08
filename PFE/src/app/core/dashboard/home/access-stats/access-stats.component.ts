import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-access-stats',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './access-stats.component.html',
  styleUrl: './access-stats.component.scss'
})
export class AccessStatsComponent implements OnInit {
  stats: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAccessStatistics();
  }

  fetchAccessStatistics() {
    this.http.get<any[]>('http://localhost:8000/api/statistics/user-access')
      .subscribe(
        (data) => {
          this.stats = data;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }
}