
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, LogOut, MessageCircle, Send, Phone, Video, User, Calendar, Star, Clock } from 'lucide-react';

const DoctorConsultation = ({ user, onLogout, setCurrentPage }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      rating: 4.9,
      experience: '15 years',
      status: 'online',
      avatar: '👩‍⚕️',
      consultationFee: '$50',
      nextAvailable: 'Available now'
    },
    {
      id: 2,
      name: 'Dr. Michael Smith',
      specialty: 'Cardiology',
      rating: 4.8,
      experience: '20 years',
      status: 'online',
      avatar: '👨‍⚕️',
      consultationFee: '$75',
      nextAvailable: 'Available now'
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Dermatology',
      rating: 4.9,
      experience: '12 years',
      status: 'busy',
      avatar: '👩‍⚕️',
      consultationFee: '$60',
      nextAvailable: 'Available in 30 min'
    },
    {
      id: 4,
      name: 'Dr. Robert Wilson',
      specialty: 'Psychiatry',
      rating: 4.7,
      experience: '18 years',
      status: 'online',
      avatar: '👨‍⚕️',
      consultationFee: '$80',
      nextAvailable: 'Available now'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim() && selectedDoctor) {
      const newMessage = {
        id: Date.now(),
        sender: 'patient',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory([...chatHistory, newMessage]);
      
      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse = {
          id: Date.now() + 1,
          sender: 'doctor',
          content: "Thank you for your message. I understand your concern. Based on what you've described, I recommend monitoring your symptoms and maintaining a healthy lifestyle. If symptoms persist or worsen, please schedule an appointment for a detailed examination.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, doctorResponse]);
      }, 2000);
      
      setMessage('');
    }
  };

  const startConsultation = (doctor) => {
    setSelectedDoctor(doctor);
    setChatHistory([
      {
        id: 1,
        sender: 'doctor',
        content: `Hello ${user.name}! I'm ${doctor.name}. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Doctor Consultation
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

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Consult with Healthcare Professionals</h2>
          <p className="text-gray-600 mt-2">Get expert medical advice from certified doctors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Doctors</CardTitle>
                <CardDescription>Choose a specialist for consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedDoctor?.id === doctor.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => startConsultation(doctor)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{doctor.avatar}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{doctor.rating}</span>
                          </div>
                          <Badge 
                            variant={doctor.status === 'online' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {doctor.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-green-600">{doctor.consultationFee}</span>
                          <span className="text-xs text-gray-500">{doctor.nextAvailable}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedDoctor ? (
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{selectedDoctor.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{selectedDoctor.name}</CardTitle>
                        <CardDescription>{selectedDoctor.specialty} • {selectedDoctor.experience} experience</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Voice Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Video Call
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className={`flex ${chat.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          chat.sender === 'patient' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{chat.content}</p>
                          <p className={`text-xs mt-1 ${
                            chat.sender === 'patient' ? 'text-green-200' : 'text-gray-500'
                          }`}>
                            {chat.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Doctor to Start Consultation</h3>
                  <p className="text-gray-600">Choose from our list of qualified healthcare professionals</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Consultation Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How Online Consultation Works</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Choose Your Doctor</h4>
              <p className="text-sm text-gray-600">Select from our qualified healthcare professionals based on your needs</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Start Consultation</h4>
              <p className="text-sm text-gray-600">Begin your consultation via chat, voice, or video call</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Follow-up Care</h4>
              <p className="text-sm text-gray-600">Schedule follow-up appointments and receive continued care</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorConsultation;
