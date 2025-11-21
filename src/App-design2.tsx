import { useState } from 'react';
import { Home } from './components/design2/Home';
import { History } from './components/design2/History';
import { Settings } from './components/design2/Settings';
import { NetworkSettings } from './components/design2/NetworkSettings';
import { Videos } from './components/design2/Videos';
import { Home as HomeIcon, History as HistoryIcon, Settings as SettingsIcon, Wifi, Menu, X, Play } from 'lucide-react';
import logo from 'figma:asset/5f316cdefa96397254c8edcbdb44ccf364a5336d.png';

type View = 'home' | 'history' | 'settings' | 'network' | 'videos';

export default function AppDesign2() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'home' as View, icon: HomeIcon, label: 'Início', description: 'Contagem em tempo real' },
    { id: 'history' as View, icon: HistoryIcon, label: 'Histórico', description: 'Registros anteriores' },
    { id: 'videos' as View, icon: Play, label: 'Vídeos', description: 'Gravações de câmera' },
    { id: 'settings' as View, icon: SettingsIcon, label: 'Configurações', description: 'Ajustes do sistema' },
    { id: 'network' as View, icon: Wifi, label: 'Rede', description: 'Conexões WiFi' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Header Bar */}
      <header className="text-white shadow-lg" style={{ backgroundColor: '#002B6B' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Piggia" className="h-12 w-12 rounded-full" />
              <div className="hidden md:block">
                <h1 className="text-xl">Piggia System</h1>
                <p className="text-xs text-blue-200">Sistema de Contagem Inteligente</p>
              </div>
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm">Operador</div>
                <div className="text-xs text-blue-200">admin</div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#336699' }}>
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside 
          className={`fixed md:sticky top-0 left-0 h-screen z-40 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
          style={{ backgroundColor: '#002B6B', width: '280px' }}
        >
          <div className="p-6 pt-24 md:pt-6">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-blue-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm">{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
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