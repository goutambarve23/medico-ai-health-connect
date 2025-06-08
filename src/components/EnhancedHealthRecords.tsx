
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, LogOut, Upload, Download, Eye, Trash2, Search, Calendar, User, AlertCircle } from 'lucide-react';

const EnhancedHealthRecords = ({ user, onLogout, setCurrentPage }) => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'Blood Test Results - March 2024.pdf',
      type: 'Lab Report',
      date: '2024-03-15',
      size: '2.3 MB',
      severity: 3,
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      name: 'X-Ray Chest - February 2024.jpg',
      type: 'Imaging',
      date: '2024-02-20',
      size: '5.1 MB',
      severity: 2,
      doctor: 'Dr. Michael Smith'
    },
    {
      id: 3,
      name: 'Prescription - Diabetes Medication.pdf',
      type: 'Prescription',
      date: '2024-03-10',
      size: '1.2 MB',
      severity: 5,
      doctor: 'Dr. Emily Davis'
    }
  ]);

  const [dragOver, setDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getSeverityInfo = (level) => {
    if (level <= 3) return { label: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (level <= 6) return { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: 'Medical Record',
        date: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        severity: Math.floor(Math.random() * 10) + 1,
        doctor: 'Self-uploaded'
      };
      setUploadedFiles(prev => [...prev, newFile]);
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    handleFileUpload(event);
  };

  const filteredFiles = uploadedFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Health Records Management
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
          <h2 className="text-3xl font-bold text-gray-900">Upload & Manage Health Records</h2>
          <p className="text-gray-600 mt-2">Securely store and organize your medical documents with AI-powered severity analysis</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-blue-600" />
              <span>Upload Medical Documents</span>
            </CardTitle>
            <CardDescription>Upload your medical records, test results, prescriptions, and imaging reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
              <p className="text-gray-600 mb-4">or</p>
              <Label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose Files
                </Button>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search records by name, type, or doctor..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by Date
          </Button>
        </div>

        {/* Records List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Health Records ({filteredFiles.length})</CardTitle>
            <CardDescription>Manage and view your uploaded medical documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFiles.map((file) => {
                const severityInfo = getSeverityInfo(file.severity);
                return (
                  <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{file.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {file.date}
                            </span>
                            <span>{file.type}</span>
                            <span>{file.size}</span>
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {file.doctor}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {/* Severity Indicator */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Severity:</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {[...Array(10)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-6 rounded-sm ${
                                    i < file.severity 
                                      ? i < 3 ? 'bg-green-500' 
                                        : i < 6 ? 'bg-yellow-500' 
                                        : 'bg-red-500'
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityInfo.bg} ${severityInfo.color}`}>
                              {file.severity}/10 - {severityInfo.label}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Severity Legend */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Severity Level Guide</CardTitle>
            <CardDescription>Understanding the severity ratings for your health records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-6 bg-green-500 rounded-sm" />
                  ))}
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-2 h-6 bg-gray-200 rounded-sm" />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-green-800">Low (1-3)</p>
                  <p className="text-sm text-green-600">Routine check-ups, normal results</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="flex space-x-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`w-2 h-6 rounded-sm ${i < 3 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-6 bg-gray-200 rounded-sm" />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-yellow-800">Medium (4-6)</p>
                  <p className="text-sm text-yellow-600">Follow-up needed, monitoring required</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <div className="flex space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-2 h-6 rounded-sm ${
                      i < 3 ? 'bg-green-500' : i < 6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-red-800">High (7-10)</p>
                  <p className="text-sm text-red-600">Urgent attention, immediate care needed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedHealthRecords;
