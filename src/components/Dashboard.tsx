
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Calendar, FileText, Activity, Settings as SettingsIcon, LogOut, Bell, Search, Plus, Bot, Monitor, Brain, Shield, MessageCircle, TrendingUp } from 'lucide-react';

const Dashboard = ({ user, onLogout, setCurrentPage }) => {
  const [notifications] = useState([
    { id: 1, message: "Remember to take your evening medication", time: "6:00 PM", type: "medication" },
    { id: 2, message: "Drink water - you're behind on your daily goal", time: "2:30 PM", type: "health-tip" },
    { id: 3, message: "Great job completing today's exercise!", time: "10:00 AM", type: "achievement" }
  ]);

  const healthTips = [
    "Regular exercise can reduce your risk of chronic diseases by up to 50%",
    "Stay hydrated - drink at least 8 glasses of water daily",
    "Get 7-9 hours of quality sleep for optimal health",
    "Eat colorful fruits and vegetables to boost your immune system"
  ];

  const menuItems = [
    { id: 'virtual-assistant', label: 'AI Health Assistant', icon: Bot, description: 'Chat with AI for health advice' },
    { id: 'remote-monitoring', label: 'Remote Monitoring', icon: Monitor, description: 'Track vital signs remotely' },
    { id: 'health-records', label: 'Health Records', icon: FileText, description: 'Manage medical records' },
    { id: 'ai-diagnostics', label: 'AI Diagnostics', icon: Brain, description: 'AI-powered health analysis' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, description: 'View scheduled appointments' },
    { id: 'health-data-entry', label: 'Health Data Entry', icon: Activity, description: 'Log vital signs & activities' },
    { id: 'doctor-consultation', label: 'Doctor Consultation', icon: MessageCircle, description: 'Chat with doctors online' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Health tips & reminders' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, description: 'Account & app preferences' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  MediCo AI
                </h1>
                <p className="text-xs text-gray-500">Healthcare Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search health data..."
                  className="pl-10 w-64"
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentPage('notifications')}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Welcome, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Health Dashboard</h2>
          <p className="text-gray-600 mt-2">Monitor your health metrics and access AI-powered healthcare features</p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('virtual-assistant')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Assistant</p>
                  <p className="text-2xl font-bold text-purple-600">Available</p>
                </div>
                <Bot className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('health-data-entry')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                  <p className="text-2xl font-bold text-red-600">72 BPM</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('appointments')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Appointment</p>
                  <p className="text-2xl font-bold text-blue-600">Today</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('ai-diagnostics')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-green-600">85%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item) => (
            <Card 
              key={item.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => setCurrentPage(item.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg">{item.label}</span>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Health Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your latest health alerts and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-600">{notification.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      notification.type === 'medication' ? 'bg-red-100 text-red-800' :
                      notification.type === 'health-tip' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {notification.type}
                    </span>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCurrentPage('notifications')}
                >
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Health Tips</CardTitle>
              <CardDescription>AI-powered tips for better health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">💡 {tip}</p>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCurrentPage('virtual-assistant')}
                >
                  Get More Health Tips
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
