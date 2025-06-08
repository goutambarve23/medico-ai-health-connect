
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
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
    dailyHealthTips: true,
    
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
      // Apply dark mode to document
      if (userSettings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, 1000);
  };

  const handleLogoutConfirm = () => {
    onLogout();
  };

  return (
    <div className={`min-h-screen ${userSettings.darkMode ? 'dark' : ''} bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900`}>
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">MediCo AI Healthcare</p>
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your profile, notifications, and app preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <User className="h-5 w-5 text-blue-600" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Update your personal information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-gray-200">Full Name</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-200">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={userSettings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="dark:text-gray-200">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Emergency contact number"
                    value={userSettings.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Bell className="h-5 w-5 text-green-600" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Choose how you want to receive notifications and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications" className="dark:text-gray-200">Email notifications</Label>
                  <Switch
                    id="emailNotifications"
                    checked={userSettings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications" className="dark:text-gray-200">SMS notifications</Label>
                  <Switch
                    id="smsNotifications"
                    checked={userSettings.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="appointmentReminders" className="dark:text-gray-200">Appointment reminders</Label>
                  <Switch
                    id="appointmentReminders"
                    checked={userSettings.appointmentReminders}
                    onCheckedChange={(checked) => handleInputChange('appointmentReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="healthAlerts" className="dark:text-gray-200">Health alerts and insights</Label>
                  <Switch
                    id="healthAlerts"
                    checked={userSettings.healthAlerts}
                    onCheckedChange={(checked) => handleInputChange('healthAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dailyHealthTips" className="dark:text-gray-200">Daily health tips</Label>
                  <Switch
                    id="dailyHealthTips"
                    checked={userSettings.dailyHealthTips}
                    onCheckedChange={(checked) => handleInputChange('dailyHealthTips', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Privacy & Data</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Control how your health data is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shareDataWithProviders" className="dark:text-gray-200">Share data with healthcare providers</Label>
                  <Switch
                    id="shareDataWithProviders"
                    checked={userSettings.shareDataWithProviders}
                    onCheckedChange={(checked) => handleInputChange('shareDataWithProviders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowResearch" className="dark:text-gray-200">Allow anonymized data for medical research</Label>
                  <Switch
                    id="allowResearch"
                    checked={userSettings.allowResearch}
                    onCheckedChange={(checked) => handleInputChange('allowResearch', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Palette className="h-5 w-5 text-orange-600" />
                <span>App Preferences</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="dark:text-gray-200">Language</Label>
                  <select
                    id="language"
                    value={userSettings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Theme</Label>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode" className="flex items-center space-x-2 dark:text-gray-200">
                      {userSettings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <span>{userSettings.darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    </Label>
                    <Switch
                      id="darkMode"
                      checked={userSettings.darkMode}
                      onCheckedChange={(checked) => handleInputChange('darkMode', checked)}
                    />
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
          <Card className="max-w-md mx-4 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <LogOut className="h-5 w-5 text-red-600" />
                <span>Confirm Logout</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Are you sure you want to logout from MediCo AI?</CardDescription>
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
