
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, LogOut, Shield, FileText, Download, Eye, Search, Plus, Upload, Lock, Share } from 'lucide-react';

const HealthRecords = ({ user, onLogout, setCurrentPage }) => {
  const records = [
    { 
      id: 1, 
      type: 'Lab Results', 
      title: 'Complete Blood Count',
      date: '2025-06-01', 
      doctor: 'Dr. Smith', 
      status: 'Normal',
      description: 'Annual blood work - All values within normal range'
    },
    { 
      id: 2, 
      type: 'Prescription', 
      title: 'Lisinopril 10mg',
      date: '2025-05-28', 
      doctor: 'Dr. Johnson', 
      status: 'Active',
      description: 'Blood pressure medication - Take daily with food'
    },
    { 
      id: 3, 
      type: 'Visit Summary', 
      title: 'Annual Physical Examination',
      date: '2025-05-20', 
      doctor: 'Dr. Wilson', 
      status: 'Complete',
      description: 'Comprehensive health evaluation - Excellent overall health'
    },
    { 
      id: 4, 
      type: 'Imaging', 
      title: 'Chest X-Ray',
      date: '2025-04-15', 
      doctor: 'Dr. Brown', 
      status: 'Normal',
      description: 'Routine chest imaging - No abnormalities detected'
    },
    { 
      id: 5, 
      type: 'Vaccination', 
      title: 'Annual Flu Shot',
      date: '2025-03-10', 
      doctor: 'Nurse Williams', 
      status: 'Complete',
      description: 'Seasonal influenza vaccination administered'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'complete': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'lab results': return '🧪';
      case 'prescription': return '💊';
      case 'visit summary': return '🏥';
      case 'imaging': return '📷';
      case 'vaccination': return '💉';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Health Record Management
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
          <h2 className="text-3xl font-bold text-gray-900">Medical Records</h2>
          <p className="text-gray-600 mt-2">Secure access to your complete medical history and documents</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search medical records..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500">
              <Upload className="mr-2 h-4 w-4" />
              Upload Record
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Request Records
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">15</p>
                <p className="text-sm text-blue-700">Total Records</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-sm text-green-700">Recent Updates</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">2</p>
                <p className="text-sm text-orange-700">Shared Records</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-sm text-purple-700">Providers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Records List */}
        <div className="grid gap-4">
          {records.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getTypeIcon(record.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{record.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1">{record.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{record.date}</span>
                        <span>•</span>
                        <span>{record.doctor}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Encrypted
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Notice */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Your Records Are Secure</h3>
                <p className="text-sm text-blue-700 mt-1">
                  All medical records are encrypted and stored securely. Only you and authorized healthcare providers can access your information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthRecords;
