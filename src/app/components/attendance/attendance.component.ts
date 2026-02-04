import { Component, OnInit } from '@angular/core';
import { AttendanceService, AttendanceRecord } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceRecords: AttendanceRecord[] = [];
  filteredRecords: AttendanceRecord[] = [];
  loading = true;
  selectedDate: string = '';
  filterStatus = '';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.loadAttendance();
  }

  loadAttendance() {
    this.loading = true;
    const date = this.selectedDate || undefined;

    this.attendanceService.getAttendanceRecords(date).subscribe({
      next: (records) => {
        this.attendanceRecords = records;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading attendance:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredRecords = this.attendanceRecords.filter(record => {
      return !this.filterStatus || record.status === this.filterStatus;
    });
  }

  onDateChange(event: Event) {
    this.selectedDate = (event.target as HTMLInputElement).value;
    this.loadAttendance();
  }

  onFilterStatus(event: Event) {
    this.filterStatus = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'present': 'badge-success',
      'late': 'badge-warning',
      'absent': 'badge-danger',
      'half_day': 'badge-info'
    };
    return classes[status] || 'badge-info';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'present': '✓',
      'late': '⏰',
      'absent': '✗',
      'half_day': '⏱️'
    };
    return icons[status] || '?';
  }
}
