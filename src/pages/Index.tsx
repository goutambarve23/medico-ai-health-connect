
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Mail, Lock, Eye, EyeOff, User, Calendar, FileText, Activity, Settings as SettingsIcon, LogOut, Bell, Search, Plus, Bot, Monitor, Brain, Shield } from 'lucide-react';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import VirtualAssistant from '../components/VirtualAssistant';
import RemoteMonitoring from '../components/RemoteMonitoring';
import HealthRecords from '../components/HealthRecords';
import EnhancedHealthRecords from '../components/EnhancedHealthRecords';
import AIDiagnostics from '../components/AIDiagnostics';
import Appointments from '../components/Appointments';
import HealthDataEntry from '../components/HealthDataEntry';
import CalendarHealthData from '../components/CalendarHealthData';
import AppointmentScheduling from '../components/AppointmentScheduling';
import Settings from '../components/Settings';
import EnhancedSettings from '../components/EnhancedSettings';
import Notifications from '../components/Notifications';
import DoctorConsultation from '../components/DoctorConsultation';
import EnhancedDoctorConsultation from '../components/EnhancedDoctorConsultation';
import SidebarDashboard from '../components/SidebarDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'virtual-assistant':
        return <VirtualAssistant user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'remote-monitoring':
        return <RemoteMonitoring user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'health-records':
        return <EnhancedHealthRecords user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'ai-diagnostics':
        return <AIDiagnostics user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'appointments':
        return <Appointments user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'health-data-entry':
        return <CalendarHealthData user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'appointment-scheduling':
        return <AppointmentScheduling user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'settings':
        return <EnhancedSettings user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'notifications':
        return <Notifications user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'doctor-consultation':
        return <EnhancedDoctorConsultation user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
      default:
        return <SidebarDashboard user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />;
    }
  };

  return renderPage();
};

export default Index;
