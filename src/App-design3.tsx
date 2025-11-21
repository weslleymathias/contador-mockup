import { useState } from 'react';
import { Home } from './components/design3/Home';
import { History } from './components/design3/History';
import { Settings } from './components/design3/Settings';
import { NetworkSettings } from './components/design3/NetworkSettings';
import { Videos } from './components/design3/Videos';
import { Home as HomeIcon, History as HistoryIcon, Settings as SettingsIcon, Wifi, Bell, User, Play } from 'lucide-react';
import logo from 'figma:asset/d2545917c5cbfd73a03c24d04358ae5c54345958.png';

type View = 'home' | 'history' | 'settings' | 'network' | 'videos';

export default function AppDesign3() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigation = [
    { id: 'home' as View, icon: HomeIcon, label: 'Contagem' },
    { id: 'history' as View, icon: HistoryIcon, label: 'Histórico' },
    { id: 'videos' as View, icon: Play, label: 'Vídeos' },
    { id: 'settings' as View, icon: SettingsIcon, label: 'Configurações' },
    { id: 'network' as View, icon: Wifi, label: 'Rede' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Top Bar */}
      <header className="text-white shadow-md" style={{ backgroundColor: '#002B6B' }}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="PigCount" className="h-10" />
              <div className="hidden sm:block">
                <div className="text-sm">PigCount</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#336699' }}></span>
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="border-t border-white/10">
          <div className="flex overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-6 py-3 transition-all whitespace-nowrap border-b-2 ${
                    currentView === item.id
                      ? 'border-white bg-white/10'
                      : 'border-transparent hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {currentView === 'home' && <Home />}
        {currentView === 'history' && <History />}
        {currentView === 'settings' && <Settings />}
        {currentView === 'network' && <NetworkSettings />}
        {currentView === 'videos' && <Videos />}
      </main>
    </div>
  );
}