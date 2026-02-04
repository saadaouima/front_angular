# Angular HR Admin Dashboard

A comprehensive Human Resources management dashboard built with Angular 17 and Supabase. This application provides a modern, professional interface for managing employees, tracking attendance, and handling leave requests.

## Features

### Dashboard
- Real-time statistics and key metrics
- Employee overview with department distribution
- Today's attendance summary
- Recent employees list
- Leave requests overview

### Employee Management
- Complete CRUD operations for employees
- Search and filter by department, status
- Employee details including salary, position, and hire date
- Status tracking (Active, On Leave, Inactive)

### Attendance Tracking
- Daily attendance records
- Check-in and check-out times
- Status indicators (Present, Late, Absent, Half Day)
- Filter by date and status

### Leave Management
- View all leave requests
- Approve or reject leave requests
- Filter by status and leave type
- Duration calculation
- Leave type categorization (Vacation, Sick, Personal, Other)

## Technology Stack

- **Frontend Framework**: Angular 17
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables
- **Database**: Supabase (PostgreSQL)
- **State Management**: RxJS
- **Forms**: Reactive Forms

## Design Features

- Clean, modern UI with professional aesthetics
- Responsive design for all screen sizes
- Smooth animations and transitions
- Blue and neutral color scheme
- Intuitive navigation with sidebar
- Card-based layout
- Interactive hover states

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Main dashboard with statistics
│   │   ├── employees/          # Employee management
│   │   ├── employee-form/      # Add/Edit employee form
│   │   ├── attendance/         # Attendance tracking
│   │   ├── leave-requests/     # Leave management
│   │   ├── sidebar/            # Navigation sidebar
│   │   ├── header/             # Top header
│   │   └── stats-card/         # Reusable stats card
│   ├── services/
│   │   ├── supabase.service.ts      # Supabase client
│   │   ├── employee.service.ts      # Employee operations
│   │   ├── attendance.service.ts    # Attendance operations
│   │   └── leave.service.ts         # Leave operations
│   ├── app.component.ts        # Root component
│   ├── app.module.ts           # App module
│   └── app-routing.module.ts  # Routing configuration
├── main.ts                     # Application bootstrap
└── styles.css                  # Global styles
```

## Database Setup

The application requires a Supabase database with the following tables:

### Tables
1. **employees** - Stores employee information
2. **attendance** - Tracks daily attendance records
3. **leave_requests** - Manages leave requests

### Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Run the SQL migration script in `database/schema.sql` in your Supabase SQL editor
3. The script will:
   - Create all necessary tables with proper relationships
   - Set up Row Level Security policies
   - Insert sample data for testing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Update `.env` file with your Supabase credentials (already configured)

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at the URL shown in the terminal.

## Building for Production

Build the application:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Key Components

### Dashboard Component
Displays overview statistics, attendance summary, recent employees, and department distribution.

### Employees Component
Full employee management with search, filter, add, edit, and delete capabilities.

### Attendance Component
View and manage daily attendance records with status indicators.

### Leave Requests Component
Manage employee leave requests with approval/rejection workflow.

## Services

### SupabaseService
Provides Supabase client instance for database operations.

### EmployeeService
Handles all employee-related CRUD operations and statistics.

### AttendanceService
Manages attendance records and daily statistics.

### LeaveService
Handles leave requests and approval workflow.

## Styling

The application uses:
- CSS Variables for consistent theming
- Flexbox and Grid for layouts
- Mobile-first responsive design
- Smooth transitions and animations
- Professional color scheme (Blues, Greens, Neutrals)

## Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication with Supabase
- Environment variables for sensitive data
- Input validation on all forms

## Future Enhancements

- Advanced reporting and analytics
- Document management
- Payroll integration
- Performance reviews
- Employee onboarding workflow
- Multi-language support
- Dark mode toggle
- Email notifications
- Calendar integration
- Mobile app version

## License

This project is created for demonstration purposes.
