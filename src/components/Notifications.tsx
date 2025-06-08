
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Heart, Activity, Calendar, AlertTriangle, Info, CheckCircle, LogOut } from 'lucide-react';

const Notifications = ({ user, onLogout, setCurrentPage }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'health-tip',
      title: 'Daily Health Tip',
      message: 'Drink at least 8 glasses of water daily to maintain proper hydration and support overall health.',
      time: '9:00 AM',
      date: '2025-06-08',
      read: false,
      icon: Heart
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Johnson is scheduled for today at 2:30 PM.',
      time: '1:30 PM',
      date: '2025-06-08',
      read: false,
      icon: Calendar
    },
    {
      id: 3,
      type: 'health-tip',
      title: 'Exercise Reminder',
      message: 'Take a 30-minute walk today to boost your cardiovascular health and mood.',
      time: '7:00 AM',
      date: '2025-06-08',
      read: true,
      icon: Activity
    },
    {
      id: 4,
      type: 'alert',
      title: 'Medication Reminder',
      message: 'Time to take your evening medication. Remember to take it with food.',
      time: '8:00 PM',
      date: '2025-06-07',
      read: true,
      icon: AlertTriangle
    },
    {
      id: 5,
      type: 'health-tip',
      title: 'Sleep Health Tip',
      message: 'Aim for 7-9 hours of quality sleep tonight. Avoid screens 1 hour before bedtime.',
      time: '9:00 PM',
      date: '2025-06-07',
      read: true,
      icon: Info
    }
  ]);

  const healthTips = [
    "Regular exercise can reduce your risk of chronic diseases by up to 50%",
    "Eating a balanced diet with fruits and vegetables boosts your immune system",
    "Deep breathing exercises can help reduce stress and lower blood pressure",
    "Stay hydrated - your body is 60% water and needs constant replenishment",
    "Regular sleep schedule helps regulate hormones and improves mental health"
  ];

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Notifications & Health Tips
                </h1>
                <p className="text-xs text-gray-500">MediCo AI Healthcare</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage('dashboard')}>
                ← Back to Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Notifications</h2>
              <p className="text-gray-600 mt-2">Stay updated with your health reminders and tips</p>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark all as read ({unreadCount})
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span className="font-medium">{unreadCount} unread</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        notification.type === 'health-tip' ? 'bg-green-100' :
                        notification.type === 'appointment' ? 'bg-blue-100' :
                        'bg-orange-100'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          notification.type === 'health-tip' ? 'text-green-600' :
                          notification.type === 'appointment' ? 'text-blue-600' :
                          'text-orange-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{notification.time}</p>
                            <p className="text-xs text-gray-400">{notification.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        {!notification.read && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Daily Health Tips Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>Daily Health Tips</span>
                </CardTitle>
                <CardDescription>Your daily dose of health wisdom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('settings')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Manage Notifications
                </Button>
                <div className="text-sm text-gray-600">
                  <p>• Health tips: Daily at 9:00 AM</p>
                  <p>• Appointments: 1 hour before</p>
                  <p>• Medications: As scheduled</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
