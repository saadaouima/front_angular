import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable, from, map } from 'rxjs';

export interface LeaveRequest {
  id?: string;
  employee_id: string;
  employee_name?: string;
  leave_type: 'vacation' | 'sick' | 'personal' | 'other';
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private supabase = this.supabaseService.getClient();

  constructor(private supabaseService: SupabaseService) {}

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return from(
      this.supabase
        .from('leave_requests')
        .select(`
          *,
          employees (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false })
    ).pipe(
      map(response => {
        const data = response.data || [];
        return data.map((leave: any) => ({
          ...leave,
          employee_name: leave.employees
            ? `${leave.employees.first_name} ${leave.employees.last_name}`
            : 'Unknown'
        }));
      })
    );
  }

  updateLeaveStatus(id: string, status: 'approved' | 'rejected'): Observable<LeaveRequest> {
    return from(
      this.supabase
        .from('leave_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single()
    ).pipe(
      map(response => response.data!)
    );
  }

  getLeaveStats(): Observable<any> {
    return from(
      this.supabase
        .from('leave_requests')
        .select('status')
    ).pipe(
      map(response => {
        const data = response.data || [];
        return {
          total: data.length,
          pending: data.filter(l => l.status === 'pending').length,
          approved: data.filter(l => l.status === 'approved').length,
          rejected: data.filter(l => l.status === 'rejected').length
        };
      })
    );
  }
}
