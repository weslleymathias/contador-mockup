import { useState } from 'react';
import { Home } from './components/design5/Home';
import { History } from './components/design5/History';
import { Settings } from './components/design5/Settings';
import { NetworkSettings } from './components/design5/NetworkSettings';
import { Videos } from './components/design5/Videos';
import { Home as HomeIcon, History as HistoryIcon, Settings as SettingsIcon, Wifi, Menu, Play } from 'lucide-react';
import logo from 'figma:asset/5f316cdefa96397254c8edcbdb44ccf364a5336d.png';

type View = 'home' | 'history' | 'settings' | 'network' | 'videos';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: 'home' as View, icon: HomeIcon, label: 'Contagem' },
    { id: 'history' as View, icon: HistoryIcon, label: 'Histórico' },
    { id: 'videos' as View, icon: Play, label: 'Vídeos' },
    { id: 'settings' as View, icon: SettingsIcon, label: 'Configurações' },
    { id: 'network' as View, icon: Wifi, label: 'Rede' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Design 5: Top Bar + Sidebar Expansível */}
      {/* Top Bar */}
      <div className="h-16 flex items-center justify-between px-4 md:px-6 shadow-sm bg-white border-b" style={{ borderBottomColor: '#336699' }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" style={{ color: '#002B6B' }} />
          </button>
          <img src={logo} alt="Piggia" className="h-10 w-10 rounded-full" />
          <h1 className="text-lg md:text-xl hidden sm:block" style={{ color: '#002B6B' }}>Piggia System</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: '#336699' }}>
            AD
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] z-40 bg-white border-r shadow-sm transition-all duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } ${sidebarOpen ? 'w-64' : 'w-0 md:w-20'}`}
          style={{ borderRightColor: '#e5e7eb' }}
        >
          <nav className={`p-4 ${!sidebarOpen && 'md:block hidden'}`}>
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={
                      currentView === item.id
                        ? { backgroundColor: '#336699' }
                        : undefined
                    }
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm md:text-base">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {currentView === 'home' && <Home />}
          {currentView === 'history' && <History />}
          {currentView === 'settings' && <Settings />}
          {currentView === 'network' && <NetworkSettings />}
          {currentView === 'videos' && <Videos />}
        </main>
      </div>
    </div>
  );
}