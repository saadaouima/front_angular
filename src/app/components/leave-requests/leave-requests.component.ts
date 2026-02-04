import { Component, OnInit } from '@angular/core';
import { LeaveService, LeaveRequest } from '../../services/leave.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  filteredRequests: LeaveRequest[] = [];
  loading = true;
  filterStatus = '';
  filterType = '';

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.loadLeaveRequests();
  }

  loadLeaveRequests() {
    this.loading = true;
    this.leaveService.getLeaveRequests().subscribe({
      next: (requests) => {
        this.leaveRequests = requests;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading leave requests:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredRequests = this.leaveRequests.filter(request => {
      const matchesStatus = !this.filterStatus || request.status === this.filterStatus;
      const matchesType = !this.filterType || request.leave_type === this.filterType;
      return matchesStatus && matchesType;
    });
  }

  onFilterStatus(event: Event) {
    this.filterStatus = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  onFilterType(event: Event) {
    this.filterType = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  approveRequest(id: string) {
    if (confirm('Approve this leave request?')) {
      this.leaveService.updateLeaveStatus(id, 'approved').subscribe({
        next: () => {
          this.loadLeaveRequests();
        },
        error: (error) => {
          console.error('Error approving leave request:', error);
          alert('Failed to approve leave request');
        }
      });
    }
  }

  rejectRequest(id: string) {
    if (confirm('Reject this leave request?')) {
      this.leaveService.updateLeaveStatus(id, 'rejected').subscribe({
        next: () => {
          this.loadLeaveRequests();
        },
        error: (error) => {
          console.error('Error rejecting leave request:', error);
          alert('Failed to reject leave request');
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'pending': 'badge-warning',
      'approved': 'badge-success',
      'rejected': 'badge-danger'
    };
    return classes[status] || 'badge-info';
  }

  getLeaveTypeBadgeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'vacation': 'badge-info',
      'sick': 'badge-danger',
      'personal': 'badge-warning',
      'other': 'badge-info'
    };
    return classes[type] || 'badge-info';
  }

  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
}
