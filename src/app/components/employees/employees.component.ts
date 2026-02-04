import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  loading = true;
  showAddForm = false;
  editingEmployee: Employee | null = null;
  searchTerm = '';
  filterDepartment = '';
  filterStatus = '';

  departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchesSearch = !this.searchTerm ||
        emp.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesDepartment = !this.filterDepartment || emp.department === this.filterDepartment;
      const matchesStatus = !this.filterStatus || emp.status === this.filterStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onFilterDepartment(event: Event) {
    this.filterDepartment = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  onFilterStatus(event: Event) {
    this.filterStatus = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  openAddForm() {
    this.showAddForm = true;
    this.editingEmployee = null;
  }

  openEditForm(employee: Employee) {
    this.editingEmployee = employee;
    this.showAddForm = true;
  }

  closeForm() {
    this.showAddForm = false;
    this.editingEmployee = null;
  }

  onEmployeeSaved() {
    this.closeForm();
    this.loadEmployees();
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee');
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'active': 'badge-success',
      'on_leave': 'badge-warning',
      'inactive': 'badge-danger'
    };
    return classes[status] || 'badge-info';
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(salary);
  }
}
