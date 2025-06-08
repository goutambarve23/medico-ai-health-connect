
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, LogOut, Calendar, Plus, Clock, MapPin, Phone, Video } from 'lucide-react';

const Appointments = ({ user, onLogout, setCurrentPage }) => {
  const appointments = [
    { 
      id: 1, 
      doctor: 'Dr. Smith', 
      specialty: 'Cardiology', 
      date: '2025-06-08', 
      time: '10:00 AM', 
      type: 'In-person',
      status: 'confirmed',
      location: 'Main Medical Center, Room 205'
    },
    { 
      id: 2, 
      doctor: 'Dr. Johnson', 
      specialty: 'General Medicine', 
      date: '2025-06-12', 
      time: '2:30 PM', 
      type: 'Telemedicine',
      status: 'confirmed',
      location: 'Video Consultation'
    },
    { 
      id: 3, 
      doctor: 'Dr. Wilson', 
      specialty: 'Dermatology', 
      date: '2025-06-15', 
      time: '11:00 AM', 
      type: 'In-person',
      status: 'pending',
      location: 'Dermatology Clinic, Floor 3'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Appointment Management
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
          <h2 className="text-3xl font-bold text-gray-900">Your Appointments</h2>
          <p className="text-gray-600 mt-2">Manage your medical appointments and consultations</p>
        </div>

        <div className="mb-6">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Schedule New Appointment
          </Button>
        </div>

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      {appointment.type === 'Telemedicine' ? (
                        <Video className="h-6 w-6 text-indigo-600" />
                      ) : (
                        <Calendar className="h-6 w-6 text-indigo-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{appointment.specialty}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {appointment.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </span>
                        <span className="flex items-center">
                          {appointment.type === 'Telemedicine' ? (
                            <Video className="h-4 w-4 mr-1" />
                          ) : (
                            <MapPin className="h-4 w-4 mr-1" />
                          )}
                          {appointment.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {appointment.type === 'Telemedicine' && (
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Video className="h-4 w-4 mr-1" />
                        Join Call
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
