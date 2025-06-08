
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, FileText, Activity, Settings as SettingsIcon, LogOut, Bell, Search, Plus, Bot, Monitor, Brain, Shield, MessageCircle, TrendingUp, Upload, Home, Menu, X, User } from 'lucide-react';

const SidebarDashboard = ({ user, onLogout, setCurrentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState([
    { id: 1, message: "Remember to take your evening medication", time: "6:00 PM", type: "medication" },
    { id: 2, message: "Drink water - you're behind on your daily goal", time: "2:30 PM", type: "health-tip" },
    { id: 3, message: "Great job completing today's exercise!", time: "10:00 AM", type: "achievement" }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview of your health', image: 'photo-1605810230434-7631ac76ec81' },
    { id: 'virtual-assistant', label: 'AI Health Assistant', icon: Bot, description: 'Chat with AI for health advice', image: 'photo-1487058792275-0ad4aaf24ca7' },
    { id: 'remote-monitoring', label: 'Remote Monitoring', icon: Monitor, description: 'Track vital signs remotely', image: 'photo-1605810230434-7631ac76ec81' },
    { id: 'health-records', label: 'Health Records', icon: FileText, description: 'Manage medical records', image: 'photo-1487058792275-0ad4aaf24ca7' },
    { id: 'ai-diagnostics', label: 'AI Diagnostics', icon: Brain, description: 'AI-powered health analysis', image: 'photo-1518495973542-4542c06a5843' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, description: 'View scheduled appointments', image: 'photo-1506744038136-46273834b3fb' },
    { id: 'health-data-entry', label: 'Health Data Entry', icon: Activity, description: 'Log vital signs & activities', image: 'photo-1470813740244-df37b8c1edcb' },
    { id: 'doctor-consultation', label: 'Doctor Consultation', icon: MessageCircle, description: 'Chat with doctors online', image: 'photo-1605810230434-7631ac76ec81' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Health tips & reminders', image: 'photo-1487058792275-0ad4aaf24ca7' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, description: 'Account & app preferences', image: 'photo-1518495973542-4542c06a5843' },
  ];

  const healthStats = [
    { label: 'Heart Rate', value: '72 BPM', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Daily Steps', value: '8,247', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Water Intake', value: '6/8 glasses', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Health Score', value: '85%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-16'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  MediCo AI
                </h1>
                <p className="text-xs text-gray-500">Healthcare Platform</p>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors text-left ${
                  sidebarOpen ? '' : 'justify-center'
                }`}
              >
                <item.icon className="h-5 w-5 text-gray-600" />
                {sidebarOpen && (
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className={`flex items-center space-x-3 ${sidebarOpen ? '' : 'justify-center'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className={`${sidebarOpen ? '' : 'w-full'}`}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Health Dashboard</h2>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search health data..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {healthStats.map((stat, index) => (
              <Card key={index} className={`${stat.bg} border-l-4 border-l-current ${stat.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${stat.color}`}>{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {menuItems.slice(1, 7).map((item) => (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 overflow-hidden"
                onClick={() => setCurrentPage(item.id)}
              >
                <div className="h-32 bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center">
                  <img 
                    src={`https://images.unsplash.com/${item.image}?w=400&h=200&fit=crop`}
                    alt={item.label}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
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
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Fast access to common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setCurrentPage('health-data-entry')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Log Health Data
                </Button>
                <Button 
                  onClick={() => setCurrentPage('appointment-scheduling')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button 
                  onClick={() => setCurrentPage('virtual-assistant')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
                <Button 
                  onClick={() => setCurrentPage('doctor-consultation')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Consult Doctor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
