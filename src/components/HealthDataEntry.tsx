
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, LogOut, Activity, Scale, Ruler, Droplets, Save, TrendingUp, Lightbulb, Target } from 'lucide-react';

const HealthDataEntry = ({ user, onLogout, setCurrentPage }) => {
  const [healthData, setHealthData] = useState({
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    oxygenLevel: '',
    weight: '',
    height: '',
    temperature: '',
    bloodSugar: ''
  });

  const [activities, setActivities] = useState({
    exercise: '',
    exerciseDuration: '',
    sleep: '',
    water: '',
    meals: '',
    stress: '',
    notes: ''
  });

  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleHealthDataChange = (field, value) => {
    setHealthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleActivityChange = (field, value) => {
    setActivities(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveData = () => {
    setIsSaving(true);
    setIsAnalyzing(true);
    
    // Simulate saving and AI analysis
    setTimeout(() => {
      setIsSaving(false);
      generateAIAnalysis();
    }, 2000);
  };

  const generateAIAnalysis = () => {
    const heartRate = parseInt(healthData.heartRate);
    const oxygenLevel = parseInt(healthData.oxygenLevel);
    const weight = parseFloat(healthData.weight);
    const height = parseFloat(healthData.height);
    
    let analysis = {
      overall: 'Good',
      insights: [],
      recommendations: [],
      healthTips: [],
      alerts: []
    };

    // Heart Rate Analysis
    if (heartRate) {
      if (heartRate < 60) {
        analysis.insights.push('Your heart rate is below normal range (bradycardia)');
        analysis.recommendations.push('Consider consulting with a cardiologist if you experience symptoms');
        analysis.alerts.push('Low heart rate detected');
      } else if (heartRate > 100) {
        analysis.insights.push('Your heart rate is above normal range (tachycardia)');
        analysis.recommendations.push('Monitor for symptoms and consider stress reduction techniques');
        analysis.alerts.push('High heart rate detected');
      } else {
        analysis.insights.push('Your heart rate is within normal range (60-100 bpm)');
        analysis.healthTips.push('Maintain regular cardio exercise to keep your heart healthy');
      }
    }

    // Oxygen Level Analysis
    if (oxygenLevel) {
      if (oxygenLevel < 95) {
        analysis.insights.push('Your oxygen saturation is below normal (hypoxemia)');
        analysis.recommendations.push('Seek immediate medical attention if experiencing breathing difficulties');
        analysis.alerts.push('Low oxygen saturation detected');
      } else {
        analysis.insights.push('Your oxygen saturation is normal (95-100%)');
        analysis.healthTips.push('Deep breathing exercises can help maintain good oxygen levels');
      }
    }

    // BMI Calculation and Analysis
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      if (bmi < 18.5) {
        analysis.insights.push(`Your BMI is ${bmi.toFixed(1)} (Underweight)`);
        analysis.recommendations.push('Consider consulting a nutritionist for healthy weight gain strategies');
      } else if (bmi > 25) {
        analysis.insights.push(`Your BMI is ${bmi.toFixed(1)} (Overweight)`);
        analysis.recommendations.push('Focus on balanced nutrition and regular exercise for healthy weight management');
      } else {
        analysis.insights.push(`Your BMI is ${bmi.toFixed(1)} (Normal weight)`);
        analysis.healthTips.push('Maintain your current healthy weight with balanced diet and exercise');
      }
    }

    // Activity-based recommendations
    if (activities.exercise) {
      analysis.healthTips.push(`Great job on ${activities.exercise}! Regular exercise boosts cardiovascular health`);
    }

    if (activities.sleep) {
      const sleepHours = parseInt(activities.sleep);
      if (sleepHours < 7) {
        analysis.recommendations.push('Aim for 7-9 hours of sleep for optimal health and recovery');
      } else {
        analysis.healthTips.push('Excellent sleep duration! Quality sleep supports immune function and mental health');
      }
    }

    if (activities.water) {
      const waterIntake = parseInt(activities.water);
      if (waterIntake < 8) {
        analysis.recommendations.push('Increase water intake to at least 8 glasses daily for proper hydration');
      } else {
        analysis.healthTips.push('Great hydration! Adequate water intake supports all bodily functions');
      }
    }

    // General health tips
    analysis.healthTips.push('Monitor your vital signs regularly to track health trends');
    analysis.healthTips.push('Maintain a balanced diet rich in fruits, vegetables, and whole grains');
    analysis.healthTips.push('Regular physical activity reduces risk of chronic diseases');

    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Health Data & Activity Tracking
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
          <h2 className="text-3xl font-bold text-gray-900">Health Data Entry & Monitoring</h2>
          <p className="text-gray-600 mt-2">Track your vital signs and daily activities for AI-powered health insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Vital Signs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Vital Signs</span>
              </CardTitle>
              <CardDescription>Enter your current vital sign measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="72"
                    value={healthData.heartRate}
                    onChange={(e) => handleHealthDataChange('heartRate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="oxygenLevel">Oxygen Level (%)</Label>
                  <Input
                    id="oxygenLevel"
                    type="number"
                    placeholder="98"
                    value={healthData.oxygenLevel}
                    onChange={(e) => handleHealthDataChange('oxygenLevel', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodPressureSystolic">Blood Pressure (Systolic)</Label>
                  <Input
                    id="bloodPressureSystolic"
                    type="number"
                    placeholder="120"
                    value={healthData.bloodPressureSystolic}
                    onChange={(e) => handleHealthDataChange('bloodPressureSystolic', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodPressureDiastolic">Blood Pressure (Diastolic)</Label>
                  <Input
                    id="bloodPressureDiastolic"
                    type="number"
                    placeholder="80"
                    value={healthData.bloodPressureDiastolic}
                    onChange={(e) => handleHealthDataChange('bloodPressureDiastolic', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="98.6"
                    value={healthData.temperature}
                    onChange={(e) => handleHealthDataChange('temperature', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                  <Input
                    id="bloodSugar"
                    type="number"
                    placeholder="100"
                    value={healthData.bloodSugar}
                    onChange={(e) => handleHealthDataChange('bloodSugar', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Measurements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-blue-600" />
                <span>Physical Measurements</span>
              </CardTitle>
              <CardDescription>Update your physical measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70.5"
                    value={healthData.weight}
                    onChange={(e) => handleHealthDataChange('weight', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={healthData.height}
                    onChange={(e) => handleHealthDataChange('height', e.target.value)}
                  />
                </div>
              </div>
              
              {healthData.weight && healthData.height && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">Calculated BMI:</p>
                  <p className="text-lg font-bold text-blue-600">
                    {((healthData.weight / ((healthData.height / 100) ** 2))).toFixed(1)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Daily Activities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Daily Activities & Lifestyle</span>
            </CardTitle>
            <CardDescription>Track your daily activities for comprehensive health monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="exercise">Exercise Type</Label>
                <Input
                  id="exercise"
                  placeholder="e.g., Walking, Running, Yoga"
                  value={activities.exercise}
                  onChange={(e) => handleActivityChange('exercise', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="exerciseDuration">Duration (minutes)</Label>
                <Input
                  id="exerciseDuration"
                  type="number"
                  placeholder="30"
                  value={activities.exerciseDuration}
                  onChange={(e) => handleActivityChange('exerciseDuration', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sleep">Sleep Hours</Label>
                <Input
                  id="sleep"
                  type="number"
                  placeholder="8"
                  value={activities.sleep}
                  onChange={(e) => handleActivityChange('sleep', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="water">Water Intake (glasses)</Label>
                <Input
                  id="water"
                  type="number"
                  placeholder="8"
                  value={activities.water}
                  onChange={(e) => handleActivityChange('water', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="meals">Meals Today</Label>
                <Input
                  id="meals"
                  type="number"
                  placeholder="3"
                  value={activities.meals}
                  onChange={(e) => handleActivityChange('meals', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="stress">Stress Level (1-10)</Label>
                <Input
                  id="stress"
                  type="number"
                  placeholder="5"
                  value={activities.stress}
                  onChange={(e) => handleActivityChange('stress', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional health notes or observations..."
                value={activities.notes}
                onChange={(e) => handleActivityChange('notes', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Results */}
        {aiAnalysis && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>AI Health Analysis & Tips</span>
              </CardTitle>
              <CardDescription>Personalized insights based on your health data and activities</CardDescription>
            </CardHeader>
            <CardContent>
              {aiAnalysis.alerts.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">⚠️ Health Alerts</h4>
                  {aiAnalysis.alerts.map((alert, index) => (
                    <p key={index} className="text-sm text-red-700">• {alert}</p>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span>Health Insights</span>
                  </h4>
                  <div className="space-y-2">
                    {aiAnalysis.insights.map((insight, index) => (
                      <p key={index} className="text-sm text-gray-700 p-2 bg-blue-50 rounded">• {insight}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-orange-600" />
                    <span>Recommendations</span>
                  </h4>
                  <div className="space-y-2">
                    {aiAnalysis.recommendations.map((rec, index) => (
                      <p key={index} className="text-sm text-gray-700 p-2 bg-orange-50 rounded">• {rec}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3 flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-green-600" />
                  <span>Health Tips</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiAnalysis.healthTips.map((tip, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">💡 {tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleSaveData}
            disabled={isSaving || isAnalyzing}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3"
          >
            {isAnalyzing ? (
              <>
                <Activity className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Health Data...
              </>
            ) : isSaving ? (
              <>
                <Save className="mr-2 h-5 w-5" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save & Analyze Health Data
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthDataEntry;
