
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, LogOut, Brain, Activity, AlertTriangle, CheckCircle, Upload, Scan, TrendingUp, Target, Lightbulb, BookOpen } from 'lucide-react';

const AIDiagnostics = ({ user, onLogout, setCurrentPage }) => {
  const [symptoms, setSymptoms] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        riskLevel: 'Low',
        confidence: 87,
        recommendations: [
          'Stay hydrated and get adequate rest',
          'Monitor symptoms for 24-48 hours',
          'Consider over-the-counter pain relief if needed',
          'Consult healthcare provider if symptoms worsen'
        ],
        healthTips: [
          'Drink warm water with honey and lemon to soothe throat irritation',
          'Practice deep breathing exercises to reduce stress and improve circulation',
          'Maintain a consistent sleep schedule of 7-9 hours for better recovery',
          'Include anti-inflammatory foods like turmeric and ginger in your diet'
        ],
        similarCases: 142,
        urgency: 'Non-urgent'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const recentAnalyses = [
    { date: '2025-06-05', condition: 'Headache Assessment', risk: 'Low', status: 'Resolved' },
    { date: '2025-06-01', condition: 'Skin Rash Analysis', risk: 'Medium', status: 'Monitoring' },
    { date: '2025-05-28', condition: 'Joint Pain Evaluation', risk: 'Low', status: 'Improved' },
  ];

  const healthInsights = [
    { 
      title: 'Sleep Pattern Analysis', 
      score: 85, 
      trend: 'improving',
      insight: 'Your sleep quality has improved by 15% this month',
      tips: ['Maintain consistent bedtime', 'Avoid caffeine after 2 PM', 'Create a relaxing bedtime routine']
    },
    { 
      title: 'Stress Level Assessment', 
      score: 72, 
      trend: 'stable',
      insight: 'Stress levels are within normal range',
      tips: ['Practice meditation daily', 'Take regular breaks during work', 'Engage in physical activities']
    },
    { 
      title: 'Activity Level Review', 
      score: 91, 
      trend: 'excellent',
      insight: 'You\'re meeting all your activity goals consistently',
      tips: ['Continue current exercise routine', 'Add variety with new activities', 'Consider strength training']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  AI-Powered Diagnostics
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
          <h2 className="text-3xl font-bold text-gray-900">AI Health Analysis</h2>
          <p className="text-gray-600 mt-2">Get intelligent health insights and risk assessments powered by advanced AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Symptom Analysis */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-red-600" />
                <span>Symptom Analysis</span>
              </CardTitle>
              <CardDescription>Describe your symptoms for AI-powered health assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="symptoms">Describe your symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Please describe your symptoms in detail... (e.g., headache, fatigue, duration, severity)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-24"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 2 days" />
                  </div>
                  <div>
                    <Label htmlFor="severity">Severity (1-10)</Label>
                    <Input id="severity" type="number" placeholder="5" />
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500"
                  disabled={isAnalyzing || !symptoms.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <Activity className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Scan className="mr-2 h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Analysis Results</span>
              </CardTitle>
              <CardDescription>AI-generated health assessment and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Risk Level: {analysisResult.riskLevel}</span>
                    </div>
                    <span className="text-sm text-gray-600">{analysisResult.confidence}% confidence</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommendations:</h4>
                    <ul className="space-y-1">
                      {analysisResult.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Similar cases analyzed: {analysisResult.similarCases}</p>
                    <p>Urgency level: {analysisResult.urgency}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Enter your symptoms above to get AI analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Health Tips After Diagnosis */}
        {analysisResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Personalized Health Tips</span>
              </CardTitle>
              <CardDescription>Based on your current analysis, here are some helpful tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResult.healthTips.map((tip, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start space-x-3">
                      <BookOpen className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Health Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Health Insights</CardTitle>
            <CardDescription>Personalized health analytics based on your data patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {healthInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <TrendingUp className={`h-4 w-4 ${
                      insight.trend === 'excellent' ? 'text-green-600' :
                      insight.trend === 'improving' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                          style={{ width: `${insight.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{insight.score}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.insight}</p>
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-gray-800">Tips:</h5>
                    {insight.tips.map((tip, tipIndex) => (
                      <p key={tipIndex} className="text-xs text-gray-600">• {tip}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Analyses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent AI Analyses</CardTitle>
            <CardDescription>Your previous health assessments and their outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.risk === 'Low' ? 'bg-green-500' :
                      analysis.risk === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{analysis.condition}</p>
                      <p className="text-sm text-gray-600">{analysis.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{analysis.risk} Risk</p>
                    <p className="text-xs text-gray-600">{analysis.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIDiagnostics;
