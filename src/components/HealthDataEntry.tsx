
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, LogOut, Activity, Scale, Ruler, Droplets, Brain, AlertCircle, CheckCircle } from 'lucide-react';

const HealthDataEntry = ({ user, onLogout, setCurrentPage }) => {
  const [healthData, setHealthData] = useState({
    heartRate: '',
    oxygenLevel: '',
    weight: '',
    height: ''
  });
  const [diagnosis, setDiagnosis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field, value) => {
    setHealthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateAIDiagnosis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const heartRate = parseInt(healthData.heartRate);
      const oxygenLevel = parseInt(healthData.oxygenLevel);
      const weight = parseFloat(healthData.weight);
      const height = parseFloat(healthData.height);
      
      let analysis = {
        overall: 'good',
        recommendations: [],
        warnings: [],
        bmi: null
      };

      // BMI calculation if height and weight are provided
      if (height && weight) {
        const heightInM = height / 100;
        analysis.bmi = (weight / (heightInM * heightInM)).toFixed(1);
      }

      // Heart rate analysis
      if (heartRate) {
        if (heartRate < 60) {
          analysis.warnings.push('Heart rate is below normal range (60-100 BPM). Consider consulting a cardiologist.');
          analysis.overall = 'caution';
        } else if (heartRate > 100) {
          analysis.warnings.push('Heart rate is above normal range (60-100 BPM). Consider reducing stress and caffeine intake.');
          analysis.overall = 'caution';
        } else {
          analysis.recommendations.push('Heart rate is within normal range. Keep up the good work!');
        }
      }

      // Oxygen level analysis
      if (oxygenLevel) {
        if (oxygenLevel < 95) {
          analysis.warnings.push('Oxygen saturation is below normal (95-100%). Please consult a healthcare provider immediately.');
          analysis.overall = 'warning';
        } else {
          analysis.recommendations.push('Oxygen saturation is excellent. Your respiratory system is functioning well.');
        }
      }

      // BMI analysis
      if (analysis.bmi) {
        if (analysis.bmi < 18.5) {
          analysis.recommendations.push('BMI indicates underweight. Consider consulting a nutritionist for a healthy weight gain plan.');
        } else if (analysis.bmi > 25) {
          analysis.recommendations.push('BMI indicates overweight. Consider a balanced diet and regular exercise.');
        } else {
          analysis.recommendations.push('BMI is within healthy range. Maintain your current lifestyle!');
        }
      }

      setDiagnosis(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateAIDiagnosis();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Health Data Entry
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
          <h2 className="text-3xl font-bold text-gray-900">Manual Health Data Entry</h2>
          <p className="text-gray-600 mt-2">Enter your health metrics for AI-powered diagnosis and insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Enter Your Health Data</span>
              </CardTitle>
              <CardDescription>Input your current health metrics for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="heartRate" className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span>Heart Rate (BPM)</span>
                  </Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="e.g., 72"
                    value={healthData.heartRate}
                    onChange={(e) => handleInputChange('heartRate', e.target.value)}
                    min="30"
                    max="200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oxygenLevel" className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span>Blood Oxygen Level (%)</span>
                  </Label>
                  <Input
                    id="oxygenLevel"
                    type="number"
                    placeholder="e.g., 98"
                    value={healthData.oxygenLevel}
                    onChange={(e) => handleInputChange('oxygenLevel', e.target.value)}
                    min="70"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center space-x-2">
                    <Scale className="h-4 w-4 text-green-600" />
                    <span>Weight (kg)</span>
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 70.5"
                    value={healthData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    min="20"
                    max="300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center space-x-2">
                    <Ruler className="h-4 w-4 text-purple-600" />
                    <span>Height (cm)</span>
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 175"
                    value={healthData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    min="100"
                    max="250"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Get AI Diagnosis
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* AI Diagnosis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI Health Analysis</span>
              </CardTitle>
              <CardDescription>AI-powered insights based on your health data</CardDescription>
            </CardHeader>
            <CardContent>
              {!diagnosis && !isAnalyzing && (
                <div className="text-center py-8">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your health data and click "Get AI Diagnosis" to see your analysis</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4 animate-pulse" />
                  <p className="text-purple-600 font-medium">AI is analyzing your health data...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              )}

              {diagnosis && (
                <div className="space-y-6">
                  {/* Overall Status */}
                  <div className={`p-4 rounded-lg border-l-4 ${
                    diagnosis.overall === 'good' ? 'bg-green-50 border-green-400' :
                    diagnosis.overall === 'caution' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {diagnosis.overall === 'good' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      )}
                      <h3 className="font-semibold text-gray-900">
                        Overall Health Status: {diagnosis.overall.charAt(0).toUpperCase() + diagnosis.overall.slice(1)}
                      </h3>
                    </div>
                  </div>

                  {/* BMI Display */}
                  {diagnosis.bmi && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Body Mass Index (BMI)</h4>
                      <p className="text-2xl font-bold text-blue-700">{diagnosis.bmi}</p>
                    </div>
                  )}

                  {/* Recommendations */}
                  {diagnosis.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-900 mb-3 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Positive Insights</span>
                      </h4>
                      <ul className="space-y-2">
                        {diagnosis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warnings */}
                  {diagnosis.warnings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-900 mb-3 flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>Areas of Concern</span>
                      </h4>
                      <ul className="space-y-2">
                        {diagnosis.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for accurate diagnosis and treatment.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthDataEntry;
