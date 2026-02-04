/*
  # HR Management System Database Schema

  ## Overview
  Creates a comprehensive HR management database with tables for employees, attendance tracking, and leave management.

  ## Tables Created

  ### 1. employees
  Stores all employee information including personal details, job information, and status.
  - `id` (uuid, primary key) - Unique employee identifier
  - `first_name` (text) - Employee's first name
  - `last_name` (text) - Employee's last name
  - `email` (text, unique) - Employee's email address
  - `phone` (text) - Contact phone number
  - `department` (text) - Department (Engineering, HR, Sales, Marketing, Finance, Operations)
  - `position` (text) - Job position/title
  - `hire_date` (date) - Date of hire
  - `salary` (numeric) - Annual salary
  - `status` (text) - Employment status (active, inactive, on_leave)
  - `avatar_url` (text, optional) - Profile picture URL
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. attendance
  Tracks daily attendance records for all employees.
  - `id` (uuid, primary key) - Unique attendance record identifier
  - `employee_id` (uuid, foreign key) - References employees table
  - `date` (date) - Attendance date
  - `check_in` (time) - Check-in time
  - `check_out` (time, optional) - Check-out time
  - `status` (text) - Attendance status (present, absent, late, half_day)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. leave_requests
  Manages employee leave requests and their approval status.
  - `id` (uuid, primary key) - Unique leave request identifier
  - `employee_id` (uuid, foreign key) - References employees table
  - `leave_type` (text) - Type of leave (vacation, sick, personal, other)
  - `start_date` (date) - Leave start date
  - `end_date` (date) - Leave end date
  - `reason` (text) - Reason for leave
  - `status` (text) - Request status (pending, approved, rejected)
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for demo purposes
  - Authenticated users can perform all operations

  ## Notes
  - All tables use UUID for primary keys with automatic generation
  - Timestamps are automatically set on creation
  - Foreign key constraints ensure data integrity
  - Indexes added for performance optimization
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  department text NOT NULL,
  position text NOT NULL,
  hire_date date NOT NULL,
  salary numeric NOT NULL,
  status text NOT NULL DEFAULT 'active',
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date date NOT NULL,
  check_in time NOT NULL,
  check_out time,
  status text NOT NULL DEFAULT 'present',
  created_at timestamptz DEFAULT now()
);

-- Create leave_requests table
CREATE TABLE IF NOT EXISTS leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);

-- Enable Row Level Security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for employees table
CREATE POLICY "Anyone can view employees"
  ON employees FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete employees"
  ON employees FOR DELETE
  TO authenticated
  USING (true);

-- Create RLS policies for attendance table
CREATE POLICY "Anyone can view attendance"
  ON attendance FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert attendance"
  ON attendance FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update attendance"
  ON attendance FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete attendance"
  ON attendance FOR DELETE
  TO authenticated
  USING (true);

-- Create RLS policies for leave_requests table
CREATE POLICY "Anyone can view leave requests"
  ON leave_requests FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert leave requests"
  ON leave_requests FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update leave requests"
  ON leave_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete leave requests"
  ON leave_requests FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data for employees
INSERT INTO employees (first_name, last_name, email, phone, department, position, hire_date, salary, status) VALUES
  ('John', 'Doe', 'john.doe@company.com', '+1-555-0101', 'Engineering', 'Senior Developer', '2022-03-15', 95000, 'active'),
  ('Jane', 'Smith', 'jane.smith@company.com', '+1-555-0102', 'HR', 'HR Manager', '2021-01-10', 85000, 'active'),
  ('Mike', 'Johnson', 'mike.johnson@company.com', '+1-555-0103', 'Sales', 'Sales Representative', '2023-06-20', 75000, 'active'),
  ('Sarah', 'Williams', 'sarah.williams@company.com', '+1-555-0104', 'Marketing', 'Marketing Specialist', '2022-11-05', 70000, 'active'),
  ('Robert', 'Brown', 'robert.brown@company.com', '+1-555-0105', 'Engineering', 'DevOps Engineer', '2021-08-12', 92000, 'active'),
  ('Emily', 'Davis', 'emily.davis@company.com', '+1-555-0106', 'Finance', 'Financial Analyst', '2023-02-28', 78000, 'active'),
  ('David', 'Martinez', 'david.martinez@company.com', '+1-555-0107', 'Operations', 'Operations Manager', '2020-05-18', 88000, 'active'),
  ('Lisa', 'Garcia', 'lisa.garcia@company.com', '+1-555-0108', 'Engineering', 'Frontend Developer', '2023-09-01', 82000, 'active'),
  ('James', 'Wilson', 'james.wilson@company.com', '+1-555-0109', 'Sales', 'Sales Manager', '2021-12-03', 95000, 'active'),
  ('Maria', 'Rodriguez', 'maria.rodriguez@company.com', '+1-555-0110', 'HR', 'Recruiter', '2022-07-22', 68000, 'on_leave')
ON CONFLICT (email) DO NOTHING;

-- Insert sample attendance data (last 7 days)
INSERT INTO attendance (employee_id, date, check_in, check_out, status)
SELECT
  e.id,
  CURRENT_DATE - (RANDOM() * 7)::int,
  ('08:' || LPAD((RANDOM() * 60)::int::text, 2, '0') || ':00')::time,
  ('17:' || LPAD((RANDOM() * 60)::int::text, 2, '0') || ':00')::time,
  CASE
    WHEN RANDOM() > 0.9 THEN 'late'
    WHEN RANDOM() > 0.95 THEN 'absent'
    ELSE 'present'
  END
FROM employees e
WHERE NOT EXISTS (
  SELECT 1 FROM attendance a WHERE a.employee_id = e.id
);

-- Insert sample leave requests
INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
SELECT
  e.id,
  (ARRAY['vacation', 'sick', 'personal'])[1 + (RANDOM() * 2)::int],
  CURRENT_DATE + (RANDOM() * 30)::int,
  CURRENT_DATE + (RANDOM() * 35)::int + 2,
  'Personal reasons',
  (ARRAY['pending', 'approved', 'rejected'])[1 + (RANDOM() * 2)::int]
FROM employees e
WHERE RANDOM() > 0.5
ON CONFLICT DO NOTHING;
