
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, LogOut, Clock, User, Stethoscope, CheckCircle, MapPin } from 'lucide-react';

const AppointmentScheduling = ({ user, onLogout, setCurrentPage }) => {
  const [appointmentData, setAppointmentData] = useState({
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    reason: '',
    location: ''
  });
  const [isScheduled, setIsScheduled] = useState(false);

  const specialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery',
    'Other'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  const handleInputChange = (field, value) => {
    setAppointmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate appointment scheduling
    setTimeout(() => {
      setIsScheduled(true);
    }, 1000);
  };

  const resetForm = () => {
    setAppointmentData({
      doctorName: '',
      specialty: '',
      date: '',
      time: '',
      reason: '',
      location: ''
    });
    setIsScheduled(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Schedule Appointment
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
          <h2 className="text-3xl font-bold text-gray-900">Schedule New Appointment</h2>
          <p className="text-gray-600 mt-2">Book your next medical appointment with ease</p>
        </div>

        {!isScheduled ? (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Please fill in all the required information for your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="doctorName" className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>Doctor Name</span>
                    </Label>
                    <Input
                      id="doctorName"
                      type="text"
                      placeholder="e.g., Dr. John Smith"
                      value={appointmentData.doctorName}
                      onChange={(e) => handleInputChange('doctorName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="flex items-center space-x-2">
                      <Stethoscope className="h-4 w-4 text-green-600" />
                      <span>Specialty</span>
                    </Label>
                    <select
                      id="specialty"
                      value={appointmentData.specialty}
                      onChange={(e) => handleInputChange('specialty', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select specialty</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span>Preferred Date</span>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={appointmentData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Preferred Time</span>
                    </Label>
                    <select
                      id="time"
                      value={appointmentData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location" className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>Location/Clinic</span>
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g., City Medical Center, 123 Main St"
                      value={appointmentData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <textarea
                      id="reason"
                      placeholder="Please describe the reason for your appointment..."
                      value={appointmentData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">Appointment Scheduled Successfully!</h3>
              <p className="text-green-700 mb-6">Your appointment has been scheduled and you will receive a confirmation email shortly.</p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-4">Appointment Details:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Doctor:</strong> {appointmentData.doctorName}</p>
                  <p><strong>Specialty:</strong> {appointmentData.specialty}</p>
                  <p><strong>Date:</strong> {new Date(appointmentData.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {appointmentData.time}</p>
                  <p><strong>Location:</strong> {appointmentData.location}</p>
                  <p><strong>Reason:</strong> {appointmentData.reason}</p>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <Button 
                  onClick={resetForm}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  Schedule Another Appointment
                </Button>
                <Button variant="outline" onClick={() => setCurrentPage('appointments')}>
                  View All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentScheduling;
