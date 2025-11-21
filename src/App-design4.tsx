import { useState } from 'react';
import { Home } from './components/design4/Home';
import { History } from './components/design4/History';
import { Settings } from './components/design4/Settings';
import { NetworkSettings } from './components/design4/NetworkSettings';
import { Home as HomeIcon, History as HistoryIcon, Settings as SettingsIcon, Wifi } from 'lucide-react';

type View = 'home' | 'history' | 'settings' | 'network';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigation = [
    { id: 'home' as View, icon: HomeIcon, label: 'Início' },
    { id: 'history' as View, icon: HistoryIcon, label: 'Histórico' },
    { id: 'settings' as View, icon: SettingsIcon, label: 'Configurações' },
    { id: 'network' as View, icon: Wifi, label: 'Rede' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation - Design 4: Lateral Compacta */}
      <div className="flex">
        <nav className="w-20 text-white flex flex-col items-center py-6 gap-6 fixed h-screen shadow-xl" style={{ backgroundColor: '#002B6B' }}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all hover:bg-white/10 ${
                  currentView === item.id ? 'bg-white/20' : ''
                }`}
                title={item.label}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Content */}
        <main className="ml-20 flex-1">
          {currentView === 'home' && <Home />}
          {currentView === 'history' && <History />}
          {currentView === 'settings' && <Settings />}
          {currentView === 'network' && <NetworkSettings />}
        </main>
      </div>
    </div>
  );
}
