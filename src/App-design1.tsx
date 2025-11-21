import { useState } from 'react';
import { Home } from './components/Home';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { NetworkSettings } from './components/NetworkSettings';
import { Videos } from './components/Videos';
import { Home as HomeIcon, History as HistoryIcon, Play, Settings as SettingsIcon, Wifi } from 'lucide-react';

type View = 'home' | 'history' | 'videos' | 'settings' | 'network';

export default function AppDesign1() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigation = [
    { id: 'home' as View, icon: HomeIcon, label: 'Início' },
    { id: 'history' as View, icon: HistoryIcon, label: 'Histórico' },
    { id: 'videos' as View, icon: Play, label: 'Vídeos' },
    { id: 'settings' as View, icon: SettingsIcon, label: 'Configurações' },
    { id: 'network' as View, icon: Wifi, label: 'Rede' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="text-white shadow-lg" style={{ backgroundColor: '#002B6B' }}>
        <div className="container mx-auto">
          <div className="flex items-center justify-around md:justify-center md:gap-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex flex-col items-center justify-center gap-1 px-4 md:px-6 py-3 md:py-4 transition-all hover:bg-white/10 ${
                    currentView === item.id ? 'bg-white/20 border-b-4 border-white' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 md:p-0">
        {currentView === 'home' && <Home />}
        {currentView === 'history' && <History />}
        {currentView === 'videos' && <Videos />}
        {currentView === 'settings' && <Settings />}
        {currentView === 'network' && <NetworkSettings />}
      </main>
    </div>
  );
}