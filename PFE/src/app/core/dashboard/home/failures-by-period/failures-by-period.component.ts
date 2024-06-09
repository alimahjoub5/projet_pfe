import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { TicketService } from 'src/app/core/services/tickets.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-failures-by-period',
  standalone: true,
  imports: [
    ChartModule,
    CalendarModule,
    FormsModule
  ],
  templateUrl: './failures-by-period.component.html',
  styleUrls: ['./failures-by-period.component.scss']
})
export class FailuresByPeriodComponent implements OnInit, OnDestroy {
  chartData: any;
  chartOptions: any;
  startDate: Date;
  endDate: Date;
  chart: Chart | null = null; // Initialize chart as null to avoid errors

  constructor(private ticketService: TicketService, private primengConfig: PrimeNGConfig) {
    Chart.register(...registerables);
    this.primengConfig.setTranslation({
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
      monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: 'Today',
      clear: 'Clear',
      weekHeader: 'Wk'
    });
  }

  ngOnInit() {
    // Initialize dates with default values or user-selected dates
    const today = new Date();
    this.startDate = today;
    this.endDate = today;

    this.fetchData();
  }

  ngOnDestroy() {
    // Destroy the chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fetchData() {
    const formattedStartDate = this.formatDate(this.startDate);
    const formattedEndDate = this.formatDate(this.endDate);

    this.ticketService.getFailuresByPeriod(formattedStartDate, formattedEndDate).subscribe({
      next: (data) => {
        const labels = data.map(item => new Date(item.date).toLocaleDateString());
        const values = data.map(item => item.count);

        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Nombre de Pannes',
              borderColor: '#42A5F5',
              fill: false,
              data: values
            }
          ]
        };

        this.chartOptions = {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Nombre de Pannes par Période de Temps',
              fontSize: 16
            },
            legend: {
              position: 'top'
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'll',
                displayFormats: {
                  day: 'MMM D'
                }
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Nombre de Pannes'
              }
            }
          },
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          }
        };

        // Destroy existing chart if present
        if (this.chart) {
          this.chart.destroy();
        }

        // Create a new chart using the canvas or a new canvas element
        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.chartData,
          options: this.chartOptions
        });
      },
      error: (error) => {
        console.error('Error fetching failure data', error);
        console.log(this.startDate);
        console.log(this.endDate);
      }
    });
  }
}
