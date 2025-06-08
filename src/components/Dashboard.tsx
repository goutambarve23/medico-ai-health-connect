import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Search, Bell, LogOut, Activity, Calendar, FileText, Settings, Bot, Monitor, Brain, Shield, Plus, TrendingUp, Users, AlertCircle, Stethoscope, Edit } from 'lucide-react';

const Dashboard = ({ user, onLogout, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, color: 'text-blue-600' },
    { id: 'virtual-assistant', label: 'AI Assistant', icon: Bot, color: 'text-purple-600' },
    { id: 'remote-monitoring', label: 'Remote Monitoring', icon: Monitor, color: 'text-green-600' },
    { id: 'health-records', label: 'Health Records', icon: FileText, color: 'text-orange-600' },
    { id: 'ai-diagnostics', label: 'AI Diagnostics', icon: Brain, color: 'text-red-600' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, color: 'text-indigo-600' },
    { id: 'health-data-entry', label: 'Health Data Entry', icon: Edit, color: 'text-pink-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">
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
                  className="pl-10 w-64 bg-white/70"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
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

      <div className="flex">
        <div className="w-64 bg-white/80 backdrop-blur-sm shadow-sm min-h-screen border-r">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={item.id === 'dashboard' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all duration-200 ${
                    item.id === 'dashboard' 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <item.icon className={`mr-3 h-4 w-4 ${item.id === 'dashboard' ? 'text-white' : item.color}`} />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">AI Health Dashboard</h2>
              <p className="text-gray-600 mt-2">Monitor your health with intelligent insights and real-time data</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">Heart Rate</p>
                      <p className="text-2xl font-bold text-red-600">72 BPM</p>
                      <p className="text-xs text-red-500">Normal range</p>
                    </div>
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Next Appointment</p>
                      <p className="text-2xl font-bold text-blue-600">Today</p>
                      <p className="text-xs text-blue-500">2:30 PM</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Health Score</p>
                      <p className="text-2xl font-bold text-green-600">85%</p>
                      <p className="text-xs text-green-500">Excellent</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">AI Insights</p>
                      <p className="text-2xl font-bold text-purple-600">3 New</p>
                      <p className="text-xs text-purple-500">Recommendations</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('virtual-assistant')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Bot className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>Virtual Health Assistant</CardTitle>
                      <CardDescription>Get instant health advice and support</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Ask questions about your health, get medication reminders, and receive personalized health tips powered by AI.</p>
                  <Button className="mt-4 w-full" variant="outline">
                    Chat with AI Assistant
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('remote-monitoring')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Monitor className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Remote Health Monitoring</CardTitle>
                      <CardDescription>Track vitals and health metrics</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Monitor your vital signs, track symptoms, and share real-time health data with your healthcare providers.</p>
                  <Button className="mt-4 w-full" variant="outline">
                    View Health Metrics
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('health-records')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Shield className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle>Health Record Management</CardTitle>
                      <CardDescription>Secure access to your medical history</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Access your complete medical history, lab results, prescriptions, and share records securely with providers.</p>
                  <Button className="mt-4 w-full" variant="outline">
                    Manage Records
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('health-data-entry')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Edit className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <CardTitle>Manual Health Data Entry</CardTitle>
                      <CardDescription>Input vitals for AI diagnosis</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manually enter your heart rate, oxygen levels, weight, and height to get AI-powered health insights and recommendations.</p>
                  <Button className="mt-4 w-full" variant="outline">
                    Enter Health Data
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('appointment-scheduling')}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    <span>Schedule New Appointment</span>
                  </CardTitle>
                  <CardDescription>Book your next medical appointment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Easily schedule appointments with your healthcare providers with our streamlined booking system.</p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('ai-diagnostics')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Brain className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle>AI-Powered Diagnostics</CardTitle>
                      <CardDescription>Advanced health analysis and insights</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Get AI-powered health assessments, risk analysis, and early detection insights based on your health data.</p>
                  <Button className="mt-4 w-full" variant="outline">
                    Get AI Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Health Activity</CardTitle>
                <CardDescription>Your latest health interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Appointment with Dr. Johnson</p>
                      <p className="text-sm text-gray-600">Today at 2:30 PM - General Checkup</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Activity className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Health metrics updated</p>
                      <p className="text-sm text-gray-600">Blood pressure and heart rate recorded</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Bot className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">AI Health Insight</p>
                      <p className="text-sm text-gray-600">New recommendation for better sleep hygiene</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
