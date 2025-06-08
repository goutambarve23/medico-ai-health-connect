
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, LogOut, Bot, Send, Mic, User, Brain, Activity, FileText } from 'lucide-react';

const VirtualAssistant = ({ user, onLogout, setCurrentPage }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      message: "Hello! I'm your AI Health Assistant. How can I help you today?",
      time: '2:30 PM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newUserMessage = {
        type: 'user',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory([...chatHistory, newUserMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          type: 'assistant',
          message: "I understand your concern. Based on your symptoms, I recommend staying hydrated and monitoring your condition. If symptoms persist, please consult with your healthcare provider.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);
      
      setMessage('');
    }
  };

  const quickQuestions = [
    "What are my medication reminders?",
    "How is my health trending?",
    "Schedule an appointment",
    "Analyze my symptoms"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Health Assistant
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  <span>AI Health Assistant</span>
                </CardTitle>
                <CardDescription>Ask questions about your health, medications, and get personalized advice</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        chat.type === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white border shadow-sm'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {chat.type === 'assistant' && <Bot className="h-4 w-4 text-purple-600 mt-1" />}
                          {chat.type === 'user' && <User className="h-4 w-4 text-white mt-1" />}
                          <div>
                            <p className="text-sm">{chat.message}</p>
                            <p className={`text-xs mt-1 ${chat.type === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                              {chat.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your health question..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setMessage(question)}
                      className="text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assistant Features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Symptom Analysis</p>
                    <p className="text-xs text-gray-600">Get insights on your symptoms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Health Monitoring</p>
                    <p className="text-xs text-gray-600">Track your vital signs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Medical Records</p>
                    <p className="text-xs text-gray-600">Access your health data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Health Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Health</span>
                    <span className="text-sm font-medium text-green-600">Good</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Checkup</span>
                    <span className="text-sm text-gray-600">2 weeks ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medications</span>
                    <span className="text-sm text-gray-600">2 active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Allergies</span>
                    <span className="text-sm text-gray-600">None known</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                  Call Emergency Services
                </Button>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  For medical emergencies, call 911 immediately
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
