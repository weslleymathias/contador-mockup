import { useState } from 'react';
import { Home } from './components/original/Home';
import { History } from './components/original/History';
import { Settings } from './components/original/Settings';
import { NetworkSettings } from './components/original/NetworkSettings';
import { Videos } from './components/original/Videos';
import { Home as HomeIcon, RotateCcw, Play, Settings as SettingsIcon, Wifi } from 'lucide-react';
import logo from 'figma:asset/721a3f0d1328e14f2f4fbd6f7f0b26df718a9e69.png';

type View = 'home' | 'history' | 'settings' | 'network' | 'videos';

export default function AppOriginal() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [username] = useState('Luciano');

  const navigation = [
    { id: 'home' as View, icon: HomeIcon, label: 'Início' },
    { id: 'history' as View, icon: RotateCcw, label: 'Histórico' },
    { id: 'videos' as View, icon: Play, label: 'Vídeos' },
    { id: 'settings' as View, icon: SettingsIcon, label: 'Configurações' },
    { id: 'network' as View, icon: Wifi, label: 'WiFi' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar - Top */}
      <nav className="flex items-center justify-around py-2 px-2 border-b shadow-sm" style={{ backgroundColor: '#002B6B' }}>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id + item.label}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[70px] ${
                isActive ? 'bg-white/20 scale-105' : 'hover:bg-white/10'
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className={`w-5 h-5 md:w-6 md:h-6 text-white ${isActive ? 'drop-shadow-lg' : ''}`} />
              <span className={`text-[10px] md:text-xs text-white ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Header */}
      <div className="bg-white py-3 px-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">Bem-vindo, <strong>{username}</strong>!</span>
          </div>
          <button className="p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Logo */}
      <div className="bg-white py-4 px-4 flex justify-center">
        <img src={logo} alt="PigCount by piggia" className="h-16" />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white overflow-y-auto">
        {currentView === 'home' && <Home />}
        {currentView === 'history' && <History />}
        {currentView === 'videos' && <Videos />}
        {currentView === 'settings' && <Settings />}
        {currentView === 'network' && <NetworkSettings />}
      </main>
    </div>
  );
}