// src/app/(dashboard)/student/page.tsx
'use client'
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Components
import WelcomeBanner from '@/components/ui/WelcomeBanner';
import StatsCard from '@/components/ui/StatsCard';
import { EventCalendar } from '@/components/ui/EventCalender';


const academicData = [
  { month: 'Jan', attendance: 88, grades: 85 },
  { month: 'Feb', attendance: 85, grades: 78 },
  { month: 'Mar', attendance: 92, grades: 90 },
  { month: 'Apr', attendance: 78, grades: 82 },
  { month: 'May', attendance: 89, grades: 88 },
  { month: 'Jun', attendance: 82, grades: 85 }
];


const holidays = [
  { date: new Date(2024, 2, 25), title: "Holi" },            // March 25, 2024
  { date: new Date(2024, 2, 29), title: "Good Friday" },      // March 29, 2024
  { date: new Date(2024, 3, 1), title: "Easter" },           // April 1, 2024
  { date: new Date(2024, 3, 9), title: "Ram Navami" }        // April 9, 2024
];

const collegeEvents = [
  {
    id: '1',
    title: 'Technical Symposium 2024',
    date: new Date(2024, 2, 20),
    time: '09:00 AM - 05:00 PM',
    venue: 'Main Auditorium',
    description: 'Annual technical fest with coding competitions and workshops',
    type: 'academic'
  },
  {
    id: '2',
    title: 'Cultural Week',
    date: new Date(2024, 3, 5),
    time: 'All Day',
    venue: 'College Campus',
    description: 'Week-long cultural celebrations with performances and competitions',
    type: 'cultural'
  },
  {
    id: '3',
    title: 'Campus Placement Drive',
    date: new Date(2024, 3, 15),
    time: '10:00 AM - 04:00 PM',
    venue: 'Placement Cell',
    description: 'Major companies visiting for recruitment',
    type: 'placement'
  }
];

// Add this attendance alerts data near other dummy data
const attendanceAlerts = [
  {
    subject: "Data Structures",
    attendance: 65,
    status: "warning",
    requiredClasses: 4
  },
  {
    subject: "Computer Networks",
    attendance: 72,
    status: "warning",
    requiredClasses: 3
  },
  {
    subject: "Database Management",
    attendance: 85,
    status: "good",
    requiredClasses: 0
  },
  {
    subject: "Operating Systems",
    attendance: 78,
    status: "warning",
    requiredClasses: 2
  }
];

// Add this notifications data near other dummy data
const notifications = [
  {
    id: '1',
    title: 'Fee Payment Reminder',
    message: 'Last date for paying semester fees is approaching. Due date: March 30, 2024',
    type: 'urgent',
    timestamp: new Date(2024, 2, 20),
    isRead: false
  },
  {
    id: '2',
    title: 'Mid-Semester Exam Schedule',
    message: 'Mid-semester examinations will commence from April 1st. Check detailed schedule on student portal.',
    type: 'academic',
    timestamp: new Date(2024, 2, 18),
    isRead: true
  },
  {
    id: '3',
    title: 'Library Book Return Notice',
    message: 'Please return borrowed books before the semester break. Avoid late fees.',
    type: 'info',
    timestamp: new Date(2024, 2, 15),
    isRead: false
  },
  {
    id: '4',
    title: 'Sports Day Registration',
    message: 'Annual Sports Day registrations are now open. Register before March 25th.',
    type: 'activity',
    timestamp: new Date(2024, 2, 10),
    isRead: true
  }
];

// Add studentStats data
const studentStats = [
  {
    icon: "📚",
    value: "8.5",
    label: "Current CGPA",
    trend: "+0.3"
  },
  {
    icon: "📅",
    value: "85%",
    label: "Attendance",
    trend: "-2%"
  },
  {
    icon: "✅",
    value: "12/15",
    label: "Assignments",
    trend: "+2"
  },
  {
    icon: "🏆",
    value: "95%",
    label: "Last Exam",
    trend: "+5%"
  }
];

export default function StudentDashboard() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-transparent">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Welcome Banner */}
        <WelcomeBanner 
          title="Welcome to Student Dashboard" 
          description="Track your academic progress and stay updated with college events" 
          buttonText="View Profile" 
          onButtonClick={() => {}} 
          className="shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left and Middle */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards in 2x2 matrix */}
            <div className="grid grid-cols-2 gap-4">
              {studentStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  title={stat.label}
                  trend={stat.trend}
                  className={`rounded-xl shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r ${
                    index === 0 ? 'from-blue-400 to-blue-600' :
                    index === 1 ? 'from-emerald-400 to-emerald-600' :
                    index === 2 ? 'from-violet-400 to-violet-600' :
                    'from-amber-400 to-amber-600'
                  }`}
                />
              ))}
            </div>

            {/* Academic Performance */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Academic Performance</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={academicData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Attendance %"
                    />
                    <Line
                      type="monotone"
                      dataKey="grades"
                      stroke="#82ca9d"
                      name="Grades %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* College Notifications */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">College Notifications</h2>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                        notification.type === 'urgent' ? 'bg-red-500' :
                        notification.type === 'academic' ? 'bg-blue-500' :
                        notification.type === 'activity' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm">{notification.title}</h3>
                          <span className="text-xs text-gray-500">
                            {format(notification.timestamp, 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            notification.type === 'urgent' ? 'bg-red-100 text-red-800' :
                            notification.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                            notification.type === 'activity' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                          {!notification.isRead && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 bg-transparent">
            {/* Holiday Calendar */}
            <Card className="p-6 ">
              {/* <h2 className="text-xl font-semibold mb-4">Academic Calendar</h2> */}
              <EventCalendar 
                eventsList={[
                  ...holidays.map(h => ({
                    date: new Date(h.date),
                    title: h.title,
                    type: 'holiday',
                    description: `Holiday: ${h.title}`
                  })),
                  ...collegeEvents.map(e => ({
                    date: new Date(e.date),
                    title: e.title,
                    type: e.type,
                    description: e.description,
                    time: e.time,
                    venue: e.venue
                  }))
                ]}
                onDateSelect={(date, events) => {
                  if (events && events.length > 0) {
                    // Show toast or modal with event details
                    const event = events[0];
                    toast({
                      title: event.title,
                      content: (
                        <div className="mt-2 space-y-2">
                          <p>{event.description}</p>
                          {event.time && <p>Time: {event.time}</p>}
                          {event.venue && <p>Venue: {event.venue}</p>}
                        </div>
                      ),
                      variant: event.type === 'holiday' ? 'destructive' : 'default'
                    });
                  }
                }}
                className="bg-white rounded-xl"
                renderDay={(date, dayEvents) => {
                  if (!dayEvents || dayEvents.length === 0) {
                    return (
                      <div className="p-1 text-center">
                        {date.getDate()}
                      </div>
                    );
                  }

                  const event = dayEvents[0]; // Get first event for the day
                  return (
                    <div className="relative w-full h-full cursor-pointer hover:bg-gray-50">
                      <div className="p-1 text-center">
                        {date.getDate()}
                      </div>
                      <div className={`absolute bottom-0 left-0 right-0 px-1 py-0.5 text-[10px] truncate
                        ${event.type === 'holiday' 
                          ? 'bg-red-100 text-red-800' 
                          : event.type === 'academic'
                          ? 'bg-blue-100 text-blue-800'
                          : event.type === 'cultural'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {event.title}
                      </div>
                    </div>
                  );
                }}
              />
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Holiday</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Academic</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Cultural</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Other Events</span>
                </div>
              </div>
            </Card>

            {/* Attendance Alerts */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Attendance Alerts</h2>
              <div className="space-y-3">
                {attendanceAlerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg ${
                      alert.status === 'warning' 
                        ? 'bg-amber-50 border border-amber-200' 
                        : 'bg-green-50 border border-green-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{alert.subject}</h3>
                        <div className="text-xs mt-1">
                          <span className={`font-medium ${
                            alert.status === 'warning' ? 'text-amber-600' : 'text-green-600'
                          }`}>
                            {alert.attendance}% attendance
                          </span>
                        </div>
                        {alert.requiredClasses > 0 && (
                          <p className="text-xs text-gray-600 mt-1">
                            Need to attend {alert.requiredClasses} more classes to meet minimum requirement
                          </p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alert.status === 'warning' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {alert.status === 'warning' ? 'Warning' : 'Good'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <p>* Minimum attendance requirement: 75%</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}