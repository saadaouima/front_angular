import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { LeaveService } from '../../services/leave.service';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeeStats = {
    total: 0,
    active: 0,
    onLeave: 0,
    inactive: 0
  };

  leaveStats = {
    pending: 0,
    approved: 0,
    rejected: 0
  };

  attendanceStats = {
    present: 0,
    absent: 0,
    late: 0
  };

  recentEmployees: any[] = [];
  loading = true;

  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    this.employeeService.getEmployeeStats().subscribe({
      next: (stats) => {
        this.employeeStats = stats;
      },
      error: (error) => {
        console.error('Error loading employee stats:', error);
        this.employeeStats = { total: 0, active: 0, onLeave: 0, inactive: 0 };
      }
    });

    this.leaveService.getLeaveStats().subscribe({
      next: (stats) => {
        this.leaveStats = stats;
      },
      error: (error) => {
        console.error('Error loading leave stats:', error);
        this.leaveStats = { pending: 0, approved: 0, rejected: 0 };
      }
    });

    this.attendanceService.getTodayAttendanceStats().subscribe({
      next: (stats) => {
        this.attendanceStats = stats;
      },
      error: (error) => {
        console.error('Error loading attendance stats:', error);
        this.attendanceStats = { present: 0, absent: 0, late: 0 };
      }
    });

    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.recentEmployees = employees.slice(0, 5);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.recentEmployees = [];
        this.loading = false;
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'active': 'badge-success',
      'on_leave': 'badge-warning',
      'inactive': 'badge-danger'
    };
    return classes[status] || 'badge-info';
  }
}
