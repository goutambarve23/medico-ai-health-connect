
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, LogOut, Monitor, Activity, TrendingUp, AlertCircle, Plus, Wifi, Battery, Signal } from 'lucide-react';

const RemoteMonitoring = ({ user, onLogout, setCurrentPage }) => {
  const vitals = [
    { name: 'Heart Rate', value: '72', unit: 'BPM', trend: 'stable', color: 'text-red-600', bgColor: 'bg-red-50' },
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: 'normal', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Blood Oxygen', value: '98', unit: '%', trend: 'good', color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Temperature', value: '98.6', unit: '°F', trend: 'normal', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const devices = [
    { name: 'Smart Watch', status: 'connected', battery: 85, signal: 'strong' },
    { name: 'Blood Pressure Monitor', status: 'connected', battery: 92, signal: 'strong' },
    { name: 'Smart Scale', status: 'offline', battery: 45, signal: 'weak' },
    { name: 'Glucose Monitor', status: 'connected', battery: 78, signal: 'moderate' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Remote Health Monitoring
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

      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Health Monitoring Dashboard</h2>
          <p className="text-gray-600 mt-2">Real-time tracking of your vital signs and health metrics</p>
        </div>

        {/* Real-time Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {vitals.map((vital, index) => (
            <Card key={index} className={`${vital.bgColor} border-l-4 border-l-current ${vital.color}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${vital.color}`}>{vital.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{vital.value}</p>
                    <p className="text-xs text-gray-600">{vital.unit} - {vital.trend}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Activity className={`h-8 w-8 ${vital.color}`} />
                    <TrendingUp className="h-4 w-4 text-green-500 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Connected Devices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-green-600" />
                <span>Connected Devices</span>
              </CardTitle>
              <CardDescription>Monitor your health devices and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        device.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{device.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">{device.battery}%</span>
                      <Signal className={`h-4 w-4 ${
                        device.signal === 'strong' ? 'text-green-600' : 
                        device.signal === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Device
              </Button>
            </CardContent>
          </Card>

          {/* Health Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span>Health Alerts</span>
              </CardTitle>
              <CardDescription>Important notifications and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Reminder</p>
                    <p className="text-sm text-yellow-700">Time to take your evening medication</p>
                    <p className="text-xs text-yellow-600">Due in 30 minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Health Insight</p>
                    <p className="text-sm text-blue-700">Your heart rate has been consistently healthy</p>
                    <p className="text-xs text-blue-600">Past 7 days average: 71 BPM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Goal Achieved</p>
                    <p className="text-sm text-green-700">You've met your daily step goal!</p>
                    <p className="text-xs text-green-600">10,247 steps today</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Trends Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
            <CardDescription>7-day overview of your health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive health charts coming soon</p>
                <p className="text-sm text-gray-500">View detailed trends and patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RemoteMonitoring;
