import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
  currentYear: number;
  currentMonth: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateCalendar(year: number, month: number): void {
    const calendarBody = this.elementRef.nativeElement.querySelector('.calendarBody');
    if (!calendarBody) return;
    calendarBody.innerHTML = '';
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = this.renderer.createElement('tr');
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < new Date(year, month).getDay()) {
          const cell = this.renderer.createElement('td');
          this.renderer.appendChild(row, cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          const cell = this.renderer.createElement('td');
          const text = this.renderer.createText(date.toString());
          this.renderer.appendChild(cell, text);
          const currentDate = new Date();
          if (currentDate.getDate() === date && currentDate.getMonth() === month && currentDate.getFullYear() === year) {
            this.renderer.addClass(cell, 'today');
          }
          this.renderer.appendChild(row, cell);
          date++;
        }
      }
      this.renderer.appendChild(calendarBody, row);
    }
    // Display current month and year
    const monthYearElems = this.elementRef.nativeElement.querySelectorAll('.monthYear');
    monthYearElems.forEach((elem: any) => {
      this.renderer.setProperty(elem, 'textContent', new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    });
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  loadImage(event: Event): void {
    // Add your image loading logic here
  }
}