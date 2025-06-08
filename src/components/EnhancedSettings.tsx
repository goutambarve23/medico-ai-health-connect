
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, LogOut, User, Bell, Shield, Moon, Sun, Globe, Heart, Smartphone, Mail, Lock, Eye, Download, Trash2 } from 'lucide-react';

const EnhancedSettings = ({ user, onLogout, setCurrentPage }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    healthTips: true,
    appointments: true,
    medication: true
  });
  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    marketing: false
  });

  const handleLogoutConfirm = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">
                <SettingsIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Settings & Preferences
                </h1>
                <p className="text-xs text-gray-500">MediCo AI Healthcare</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage('dashboard')}>
                ← Back to Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogoutConfirm}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-600 mt-2">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal details and medical information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user.name.split(' ')[0]} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user.name.split(' ')[1] || ''} />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="Name and phone number" />
              </div>
              <Button className="w-full">Update Profile</Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {darkMode ? <Moon className="h-5 w-5 text-purple-600" /> : <Sun className="h-5 w-5 text-yellow-600" />}
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-600">Toggle dark theme</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+1 (Central European Time)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-600" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Control how you receive health updates and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Browser and mobile notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-gray-600">Text message notifications</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Health Tips</Label>
                    <p className="text-sm text-gray-600">Receive AI-powered health advice</p>
                  </div>
                  <Switch
                    checked={notifications.healthTips}
                    onCheckedChange={(checked) => setNotifications({...notifications, healthTips: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-gray-600">Get notified about upcoming appointments</p>
                  </div>
                  <Switch
                    checked={notifications.appointments}
                    onCheckedChange={(checked) => setNotifications({...notifications, appointments: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Medication Reminders</Label>
                    <p className="text-sm text-gray-600">Never miss your medications</p>
                  </div>
                  <Switch
                    checked={notifications.medication}
                    onCheckedChange={(checked) => setNotifications({...notifications, medication: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>Manage your data privacy and account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share Anonymous Data</Label>
                    <p className="text-sm text-gray-600">Help improve healthcare research</p>
                  </div>
                  <Switch
                    checked={privacy.shareData}
                    onCheckedChange={(checked) => setPrivacy({...privacy, shareData: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics</Label>
                    <p className="text-sm text-gray-600">Help us improve the app</p>
                  </div>
                  <Switch
                    checked={privacy.analytics}
                    onCheckedChange={(checked) => setPrivacy({...privacy, analytics: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-gray-600">Receive product updates and offers</p>
                  </div>
                  <Switch
                    checked={privacy.marketing}
                    onCheckedChange={(checked) => setPrivacy({...privacy, marketing: checked})}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  View Login History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-blue-600" />
                <span>Data Management</span>
              </CardTitle>
              <CardDescription>Export your data or manage your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center justify-center p-6 h-auto">
                  <div className="text-center">
                    <Download className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-medium">Export Health Data</p>
                    <p className="text-sm text-gray-600">Download your complete health record</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="flex items-center justify-center p-6 h-auto">
                  <div className="text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">Privacy Report</p>
                    <p className="text-sm text-gray-600">See how your data is used</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="flex items-center justify-center p-6 h-auto border-red-200 hover:bg-red-50">
                  <div className="text-center">
                    <Trash2 className="h-8 w-8 mx-auto mb-2 text-red-600" />
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-gray-600">Permanently remove your account</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Medical Information</span>
              </CardTitle>
              <CardDescription>Important medical details for healthcare providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <select id="bloodType" className="w-full mt-1 p-2 border rounded-md">
                    <option>Select blood type</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="insurance">Insurance Provider</Label>
                  <Input id="insurance" placeholder="Insurance company name" />
                </div>
                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Input id="allergies" placeholder="List any allergies" />
                </div>
                <div>
                  <Label htmlFor="conditions">Chronic Conditions</Label>
                  <Input id="conditions" placeholder="Ongoing health conditions" />
                </div>
              </div>
              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <textarea 
                  id="medications" 
                  placeholder="List current medications and dosages"
                  className="w-full mt-1 p-2 border rounded-md h-20"
                />
              </div>
              <Button className="w-full">Update Medical Information</Button>
            </CardContent>
          </Card>
        </div>

        {/* Logout Section */}
        <Card className="mt-6 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Account Actions</h3>
                <p className="text-sm text-gray-600">Manage your session and account status</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleLogoutConfirm}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedSettings;
