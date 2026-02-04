import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable, from, map } from 'rxjs';

export interface AttendanceRecord {
  id?: string;
  employee_id: string;
  employee_name?: string;
  date: string;
  check_in: string;
  check_out?: string;
  status: 'present' | 'absent' | 'late' | 'half_day';
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private supabase = this.supabaseService.getClient();

  constructor(private supabaseService: SupabaseService) {}

  getAttendanceRecords(date?: string): Observable<AttendanceRecord[]> {
    let query = this.supabase
      .from('attendance')
      .select(`
        *,
        employees (
          first_name,
          last_name
        )
      `)
      .order('date', { ascending: false });

    if (date) {
      query = query.eq('date', date);
    }

    return from(query).pipe(
      map(response => {
        const data = response.data || [];
        return data.map((att: any) => ({
          ...att,
          employee_name: att.employees
            ? `${att.employees.first_name} ${att.employees.last_name}`
            : 'Unknown'
        }));
      })
    );
  }

  getTodayAttendanceStats(): Observable<any> {
    const today = new Date().toISOString().split('T')[0];

    return from(
      this.supabase
        .from('attendance')
        .select('status')
        .eq('date', today)
    ).pipe(
      map(response => {
        const data = response.data || [];
        return {
          total: data.length,
          present: data.filter(a => a.status === 'present').length,
          absent: data.filter(a => a.status === 'absent').length,
          late: data.filter(a => a.status === 'late').length
        };
      })
    );
  }
}
