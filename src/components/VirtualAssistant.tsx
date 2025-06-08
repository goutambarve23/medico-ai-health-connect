
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, LogOut, Bot, Send, Mic, User, Brain, Activity, FileText, Lightbulb, Shield, Calendar } from 'lucide-react';

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
      
      // Simulate AI response with more detailed health information
      setTimeout(() => {
        const aiResponse = {
          type: 'assistant',
          message: generateHealthResponse(message),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);
      
      setMessage('');
    }
  };

  const generateHealthResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('pain')) {
      return "For headaches, try staying hydrated, getting adequate rest, and applying a cold compress. If headaches persist or are severe, consult your healthcare provider. Common triggers include stress, dehydration, and poor sleep.";
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      return "Regular exercise is excellent for your health! Aim for 150 minutes of moderate aerobic activity weekly. Start slowly if you're a beginner. Include cardio, strength training, and flexibility exercises. Always warm up before and cool down after workouts.";
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
      return "A balanced diet should include fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, excess sugar, and sodium. Stay hydrated with 8+ glasses of water daily. Consider meal planning for better nutrition consistency.";
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      return "Quality sleep is crucial for health. Aim for 7-9 hours nightly. Maintain a consistent sleep schedule, create a relaxing bedtime routine, avoid screens before bed, and keep your bedroom cool and dark. Poor sleep affects immunity, mood, and cognitive function.";
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
      return "Stress management is vital for overall health. Try deep breathing exercises, meditation, regular physical activity, and maintaining social connections. If stress feels overwhelming, consider speaking with a mental health professional. Chronic stress can impact both physical and mental health.";
    } else {
      return "I understand your concern. Based on your symptoms, I recommend staying hydrated, monitoring your condition, and maintaining healthy lifestyle habits. If symptoms persist or worsen, please consult with your healthcare provider for proper evaluation.";
    }
  };

  const quickQuestions = [
    "What are my medication reminders?",
    "How is my health trending?",
    "Schedule an appointment",
    "Analyze my symptoms",
    "Diet and nutrition tips",
    "Exercise recommendations",
    "Sleep improvement advice",
    "Stress management techniques"
  ];

  const healthTopics = [
    {
      title: "Preventive Care",
      description: "Regular checkups and screenings",
      icon: Shield,
      info: "Stay ahead of health issues with regular preventive care including annual physicals, vaccinations, and age-appropriate screenings."
    },
    {
      title: "Mental Wellness",
      description: "Managing stress and mental health",
      icon: Brain,
      info: "Mental health is as important as physical health. Practice mindfulness, maintain social connections, and seek help when needed."
    },
    {
      title: "Nutrition Guide",
      description: "Balanced eating for optimal health",
      icon: Heart,
      info: "Eat a variety of colorful fruits and vegetables, choose whole grains, lean proteins, and healthy fats while limiting processed foods."
    },
    {
      title: "Fitness Tips",
      description: "Exercise and physical activity",
      icon: Activity,
      info: "Regular physical activity reduces disease risk, improves mood, and increases energy. Find activities you enjoy to stay consistent."
    }
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

          {/* Health Information Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span>Health Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthTopics.map((topic, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                    <div className="flex items-start space-x-3">
                      <topic.icon className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-sm">{topic.title}</p>
                        <p className="text-xs text-gray-600 mb-2">{topic.description}</p>
                        <p className="text-xs text-gray-700">{topic.info}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setCurrentPage('doctor-consultation')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Consult Doctor
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setCurrentPage('appointment-scheduling')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setCurrentPage('health-data-entry')}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Update Health Data
                </Button>
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
