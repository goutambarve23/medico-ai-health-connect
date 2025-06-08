import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, LogOut, MessageCircle, Send, Phone, Video, User, Calendar, Star, Clock, HelpCircle, AlertCircle, Shield, FileText } from 'lucide-react';

const EnhancedDoctorConsultation = ({ user, onLogout, setCurrentPage }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

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
      nextAvailable: 'Available now',
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      certifications: ['Board Certified Internal Medicine']
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
      nextAvailable: 'Available now',
      languages: ['English', 'French'],
      education: 'Johns Hopkins University',
      certifications: ['Board Certified Cardiology', 'Advanced Heart Failure']
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
      nextAvailable: 'Available in 30 min',
      languages: ['English', 'German'],
      education: 'Stanford University',
      certifications: ['Board Certified Dermatology', 'Cosmetic Dermatology']
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
      nextAvailable: 'Available now',
      languages: ['English'],
      education: 'University of California, Los Angeles',
      certifications: ['Board Certified Psychiatry', 'Addiction Psychiatry']
    }
  ];

  const helpTopics = [
    {
      title: 'How to Start a Consultation',
      content: '1. Select a doctor from the list\n2. Click to start consultation\n3. Begin chatting or request video call\n4. Share your symptoms and concerns'
    },
    {
      title: 'Consultation Guidelines',
      content: '• Be specific about your symptoms\n• Mention duration and severity\n• List current medications\n• Share relevant medical history'
    },
    {
      title: 'Emergency Situations',
      content: 'For medical emergencies, call 911 immediately. This platform is for non-emergency consultations and follow-up care.'
    },
    {
      title: 'Privacy & Security',
      content: 'All consultations are encrypted and HIPAA compliant. Your medical information is secure and private.'
    },
    {
      title: 'Payment & Insurance',
      content: 'Consultation fees are clearly displayed. We accept major insurance plans and offer direct payment options.'
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
              <Button variant="ghost" size="sm" onClick={() => setShowHelp(!showHelp)}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
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
          <p className="text-gray-600 mt-2">Get expert medical advice from certified doctors with enhanced features</p>
        </div>

        {/* Help Panel */}
        {showHelp && (
          <Card className="mb-6 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <span>Consultation Help & Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {helpTopics.map((topic, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border">
                    <h4 className="font-medium text-gray-900 mb-2">{topic.title}</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{topic.content}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">Emergency Notice</h4>
                    <p className="text-sm text-red-700">
                      For life-threatening emergencies, call 911 immediately. This platform is designed for non-emergency medical consultations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Doctor List */}
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
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{doctor.avatar}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-xs text-gray-500">{doctor.education}</p>
                        
                        <div className="flex items-center space-x-2 mt-2">
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
                          <span className="text-xs text-gray-500">{doctor.experience}</span>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-xs text-gray-600">Languages: {doctor.languages.join(', ')}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-medium text-green-600">{doctor.consultationFee}</span>
                            <span className="text-xs text-gray-500">{doctor.nextAvailable}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 space-y-1">
                          {doctor.certifications.map((cert, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Consultation Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Consultation Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Secure messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">HD video calls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Share medical records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">HIPAA compliant</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Chat Interface */}
          <div className="lg:col-span-2">
            {selectedDoctor ? (
              <Card className="h-[700px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{selectedDoctor.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{selectedDoctor.name}</CardTitle>
                        <CardDescription>
                          {selectedDoctor.specialty} • {selectedDoctor.experience} experience
                          <br />
                          <span className="text-xs">{selectedDoctor.education}</span>
                        </CardDescription>
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
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Share Records
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
                    <p className="text-xs text-gray-500 mt-2">
                      Your conversation is encrypted and HIPAA compliant
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[700px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Doctor to Start Consultation</h3>
                  <p className="text-gray-600 mb-4">Choose from our list of qualified healthcare professionals</p>
                  <Button onClick={() => setShowHelp(true)} variant="outline">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    View Help Guide
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDoctorConsultation;
