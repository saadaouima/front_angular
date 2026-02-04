import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable, from, map } from 'rxjs';

export interface Employee {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hire_date: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  avatar_url?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private supabase = this.supabaseService.getClient();

  constructor(private supabaseService: SupabaseService) {}

  getEmployees(): Observable<Employee[]> {
    return from(
      this.supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false })
    ).pipe(
      map(response => response.data || [])
    );
  }

  getEmployee(id: string): Observable<Employee | null> {
    return from(
      this.supabase
        .from('employees')
        .select('*')
        .eq('id', id)
        .maybeSingle()
    ).pipe(
      map(response => response.data)
    );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return from(
      this.supabase
        .from('employees')
        .insert([employee])
        .select()
        .single()
    ).pipe(
      map(response => response.data!)
    );
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee> {
    return from(
      this.supabase
        .from('employees')
        .update(employee)
        .eq('id', id)
        .select()
        .single()
    ).pipe(
      map(response => response.data!)
    );
  }

  deleteEmployee(id: string): Observable<void> {
    return from(
      this.supabase
        .from('employees')
        .delete()
        .eq('id', id)
    ).pipe(
      map(() => undefined)
    );
  }

  getEmployeeStats(): Observable<any> {
    return from(
      this.supabase
        .from('employees')
        .select('status, department')
    ).pipe(
      map(response => {
        const data = response.data || [];
        return {
          total: data.length,
          active: data.filter(e => e.status === 'active').length,
          onLeave: data.filter(e => e.status === 'on_leave').length,
          inactive: data.filter(e => e.status === 'inactive').length,
          departments: this.groupByDepartment(data)
        };
      })
    );
  }

  private groupByDepartment(data: any[]): { [key: string]: number } {
    return data.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});
  }
}
