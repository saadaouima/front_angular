# Quick Setup Guide

## Step 1: Database Setup

Your Supabase database is already connected. To set up the database tables:

1. Open your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to your project: https://0ec90b57d6e95fcbda19832f.supabase.co
3. Go to the SQL Editor
4. Copy the contents of `database/schema.sql`
5. Paste and run the SQL script
6. This will create all tables, set up security policies, and add sample data

## Step 2: Verify Environment Variables

Your environment is already configured in `.env`:
- VITE_SUPABASE_URL is set
- VITE_SUPABASE_ANON_KEY is set

## Step 3: Install Dependencies (Already Done)

Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

## Step 4: Run the Application

The dev server is automatically started for you. If you need to start it manually:
```bash
npm run dev
```

## What's Included

### Pages
- **Dashboard** (`/dashboard`) - Overview with statistics and charts
- **Employees** (`/employees`) - Full employee management
- **Attendance** (`/attendance`) - Track daily attendance
- **Leave Requests** (`/leave-requests`) - Manage leave requests

### Features
- Add, edit, and delete employees
- Filter and search employees by department and status
- View attendance records with date filtering
- Approve or reject leave requests
- Real-time statistics on the dashboard
- Responsive design for all devices

### Sample Data
The database script includes:
- 10 sample employees across different departments
- Sample attendance records
- Sample leave requests with different statuses

### Navigation
Use the sidebar to navigate between different sections:
- Dashboard - Main overview
- Employees - Manage employees
- Attendance - Track attendance
- Leave Requests - Handle leave requests

## Troubleshooting

### No data showing?
Make sure you've run the SQL script in Supabase SQL Editor.

### Build errors?
Run `npm install` again to ensure all dependencies are installed.

### Database connection issues?
Check that your Supabase credentials in `.env` are correct.

## Next Steps

1. Run the database schema script in Supabase
2. Refresh your application
3. Explore the dashboard and different sections
4. Try adding new employees
5. Test the filtering and search features
6. Approve/reject leave requests

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review the database schema in `database/schema.sql`
- Check browser console for any errors
