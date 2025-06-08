
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings as SettingsIcon, LogOut, User, Bell, Shield, Palette, Moon, Sun, Heart, Save } from 'lucide-react';

const Settings = ({ user, onLogout, setCurrentPage }) => {
  const [userSettings, setUserSettings] = useState({
    // Profile Settings
    name: user.name || '',
    email: user.email || '',
    phone: '',
    emergencyContact: '',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    healthAlerts: true,
    
    // Privacy Settings
    shareDataWithProviders: true,
    allowResearch: false,
    
    // App Settings
    darkMode: false,
    language: 'English'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleInputChange = (field, value) => {
    setUserSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      // You could show a toast notification here
    }, 1000);
  };

  const handleLogoutConfirm = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                <SettingsIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Settings & Preferences
                </h1>
                <p className="text-xs text-gray-500">MediCo AI Healthcare</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage('dashboard')}>
                ← Back to Dashboard
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setShowLogoutConfirm(true)}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-600 mt-2">Manage your profile, notifications, and app preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={userSettings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Emergency contact number"
                    value={userSettings.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-600" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailNotifications"
                    checked={userSettings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                  <Label htmlFor="emailNotifications">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smsNotifications"
                    checked={userSettings.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                  />
                  <Label htmlFor="smsNotifications">SMS notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="appointmentReminders"
                    checked={userSettings.appointmentReminders}
                    onCheckedChange={(checked) => handleInputChange('appointmentReminders', checked)}
                  />
                  <Label htmlFor="appointmentReminders">Appointment reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="healthAlerts"
                    checked={userSettings.healthAlerts}
                    onCheckedChange={(checked) => handleInputChange('healthAlerts', checked)}
                  />
                  <Label htmlFor="healthAlerts">Health alerts and insights</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Privacy & Data</span>
              </CardTitle>
              <CardDescription>Control how your health data is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shareDataWithProviders"
                    checked={userSettings.shareDataWithProviders}
                    onCheckedChange={(checked) => handleInputChange('shareDataWithProviders', checked)}
                  />
                  <Label htmlFor="shareDataWithProviders">Share data with healthcare providers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowResearch"
                    checked={userSettings.allowResearch}
                    onCheckedChange={(checked) => handleInputChange('allowResearch', checked)}
                  />
                  <Label htmlFor="allowResearch">Allow anonymized data for medical research</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-orange-600" />
                <span>App Preferences</span>
              </CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={userSettings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="darkMode"
                        checked={userSettings.darkMode}
                        onCheckedChange={(checked) => handleInputChange('darkMode', checked)}
                      />
                      <Label htmlFor="darkMode" className="flex items-center space-x-1">
                        {userSettings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        <span>{userSettings.darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setCurrentPage('dashboard')}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              {isSaving ? (
                <>
                  <Heart className="mr-2 h-4 w-4 animate-pulse" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LogOut className="h-5 w-5 text-red-600" />
                <span>Confirm Logout</span>
              </CardTitle>
              <CardDescription>Are you sure you want to logout from MediCo AI?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={handleLogoutConfirm}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;
