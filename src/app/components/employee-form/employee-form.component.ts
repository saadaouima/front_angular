import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  employeeForm: FormGroup;
  submitting = false;

  departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'];
  statuses = [
    { value: 'active', label: 'Active' },
    { value: 'on_leave', label: 'On Leave' },
    { value: 'inactive', label: 'Inactive' }
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      hire_date: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      status: ['active', Validators.required]
    });
  }

  ngOnInit() {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  get isEditMode(): boolean {
    return !!this.employee;
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const formValue = this.employeeForm.value;

    if (this.isEditMode && this.employee?.id) {
      this.employeeService.updateEmployee(this.employee.id, formValue).subscribe({
        next: () => {
          this.submitting = false;
          this.saved.emit();
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee');
          this.submitting = false;
        }
      });
    } else {
      this.employeeService.createEmployee(formValue).subscribe({
        next: () => {
          this.submitting = false;
          this.saved.emit();
        },
        error: (error) => {
          console.error('Error creating employee:', error);
          alert('Failed to create employee');
          this.submitting = false;
        }
      });
    }
  }

  onCancel() {
    this.cancelled.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
