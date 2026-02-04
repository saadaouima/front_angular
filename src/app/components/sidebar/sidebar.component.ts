import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { icon: '👥', label: 'Employees', route: '/employees' },
    { icon: '⏰', label: 'Attendance', route: '/attendance' },
    { icon: '📅', label: 'Leave Requests', route: '/leave-requests' }
  ];

  constructor(public router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
