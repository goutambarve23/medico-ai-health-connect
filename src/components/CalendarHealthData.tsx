
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Heart, Activity, Scale, Droplets, Save, TrendingUp, Lightbulb, Target, LogOut, Footprints } from 'lucide-react';
import { format } from 'date-fns';

const CalendarHealthData = ({ user, onLogout, setCurrentPage }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyData, setDailyData] = useState({
    heartRate: '',
    bloodPressure: '',
    weight: '',
    steps: '',
    distance: '',
    water: '',
    sleep: '',
    exercise: '',
    mood: '',
    notes: ''
  });

  const [savedData, setSavedData] = useState({
    '2024-03-15': { steps: '8247', water: '8', heartRate: '72', mood: 'Good' },
    '2024-03-14': { steps: '9150', water: '6', heartRate: '74', mood: 'Great' },
    '2024-03-13': { steps: '7850', water: '7', heartRate: '70', mood: 'Good' }
  });

  const [dailyTips, setDailyTips] = useState([]);

  const handleDataChange = (field, value) => {
    setDailyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveData = () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setSavedData(prev => ({
      ...prev,
      [dateKey]: { ...dailyData }
    }));
    generateDailyTips();
  };

  const generateDailyTips = () => {
    const tips = [];
    const steps = parseInt(dailyData.steps);
    const water = parseInt(dailyData.water);
    const sleep = parseInt(dailyData.sleep);
    const heartRate = parseInt(dailyData.heartRate);

    if (steps < 8000) {
      tips.push('Try to increase your daily steps to 8,000-10,000 for better cardiovascular health');
    } else if (steps > 10000) {
      tips.push('Excellent step count! You\'re meeting recommended daily activity levels');
    }

    if (water < 8) {
      tips.push('Increase water intake to at least 8 glasses daily for proper hydration');
    } else {
      tips.push('Great hydration! Adequate water intake supports all bodily functions');
    }

    if (sleep < 7) {
      tips.push('Aim for 7-9 hours of sleep for optimal health and recovery');
    } else if (sleep >= 7) {
      tips.push('Good sleep duration! Quality sleep supports immune function and mental health');
    }

    if (heartRate && heartRate > 100) {
      tips.push('Your heart rate seems elevated. Consider relaxation techniques and consult your doctor if persistent');
    } else if (heartRate && heartRate >= 60 && heartRate <= 100) {
      tips.push('Your heart rate is within normal range - keep up the good work!');
    }

    tips.push('Regular monitoring helps track health trends and identify patterns');
    tips.push('Maintain a balanced diet rich in fruits, vegetables, and whole grains');

    setDailyTips(tips);
  };

  const getDateData = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return savedData[dateKey];
  };

  const loadDateData = (date) => {
    setSelectedDate(date);
    const dateKey = format(date, 'yyyy-MM-dd');
    const data = savedData[dateKey];
    if (data) {
      setDailyData(prev => ({ ...prev, ...data }));
    } else {
      setDailyData({
        heartRate: '',
        bloodPressure: '',
        weight: '',
        steps: '',
        distance: '',
        water: '',
        sleep: '',
        exercise: '',
        mood: '',
        notes: ''
      });
    }
    setDailyTips([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Health Calendar & Activity Tracking
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
          <h2 className="text-3xl font-bold text-gray-900">Daily Health Tracking Calendar</h2>
          <p className="text-gray-600 mt-2">Track your daily health metrics and receive personalized tips</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                <span>Health Calendar</span>
              </CardTitle>
              <CardDescription>Select a date to view or add health data</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={loadDateData}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasData: (date) => !!getDateData(date)
                }}
                modifiersStyles={{
                  hasData: { backgroundColor: '#10b981', color: 'white', borderRadius: '50%' }
                }}
              />
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Legend:</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Has health data</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Entry */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Health Data for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
              <CardDescription>Enter your daily health metrics and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vital Signs */}
              <div>
                <h3 className="font-medium mb-3 flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span>Vital Signs</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                    <Input
                      id="heartRate"
                      type="number"
                      placeholder="72"
                      value={dailyData.heartRate}
                      onChange={(e) => handleDataChange('heartRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodPressure">Blood Pressure</Label>
                    <Input
                      id="bloodPressure"
                      placeholder="120/80"
                      value={dailyData.bloodPressure}
                      onChange={(e) => handleDataChange('bloodPressure', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Physical Measurements & Activity */}
              <div>
                <h3 className="font-medium mb-3 flex items-center space-x-2">
                  <Scale className="h-4 w-4 text-blue-600" />
                  <span>Physical Measurements & Activity</span>
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="70.5"
                      value={dailyData.weight}
                      onChange={(e) => handleDataChange('weight', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="steps">Steps</Label>
                    <div className="relative">
                      <Footprints className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="steps"
                        type="number"
                        placeholder="8,000"
                        className="pl-10"
                        value={dailyData.steps}
                        onChange={(e) => handleDataChange('steps', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="distance">Distance (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      step="0.1"
                      placeholder="5.2"
                      value={dailyData.distance}
                      onChange={(e) => handleDataChange('distance', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Daily Activities */}
              <div>
                <h3 className="font-medium mb-3 flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  <span>Daily Activities</span>
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="water">Water (glasses)</Label>
                    <div className="relative">
                      <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="water"
                        type="number"
                        placeholder="8"
                        className="pl-10"
                        value={dailyData.water}
                        onChange={(e) => handleDataChange('water', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sleep">Sleep (hours)</Label>
                    <Input
                      id="sleep"
                      type="number"
                      placeholder="8"
                      value={dailyData.sleep}
                      onChange={(e) => handleDataChange('sleep', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="exercise">Exercise (minutes)</Label>
                    <Input
                      id="exercise"
                      type="number"
                      placeholder="30"
                      value={dailyData.exercise}
                      onChange={(e) => handleDataChange('exercise', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mood">Mood (1-10)</Label>
                    <Input
                      id="mood"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="7"
                      value={dailyData.mood}
                      onChange={(e) => handleDataChange('mood', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Daily Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes about your health or activities today..."
                  value={dailyData.notes}
                  onChange={(e) => handleDataChange('notes', e.target.value)}
                />
              </div>

              <Button onClick={handleSaveData} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                <Save className="mr-2 h-4 w-4" />
                Save Health Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Daily Health Tips */}
        {dailyTips.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Personalized Health Tips for {format(selectedDate, 'MMMM d, yyyy')}</span>
              </CardTitle>
              <CardDescription>AI-powered recommendations based on your daily data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyTips.map((tip, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">💡 {tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>Weekly Summary</span>
            </CardTitle>
            <CardDescription>Overview of your health metrics for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Footprints className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">24,247</p>
                <p className="text-sm text-gray-600">Total Steps</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Droplets className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">52</p>
                <p className="text-sm text-gray-600">Glasses of Water</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">72</p>
                <p className="text-sm text-gray-600">Avg Heart Rate</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">150</p>
                <p className="text-sm text-gray-600">Exercise Minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarHealthData;
