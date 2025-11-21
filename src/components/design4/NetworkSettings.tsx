import { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, Eye, EyeOff, Signal, Lock, Globe, Server } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

type Network = {
  ssid: string;
  signal: number;
  secured: boolean;
  connected: boolean;
};

export function NetworkSettings() {
  const [networks, setNetworks] = useState<Network[]>([
    { ssid: 'WiFi-Principal', signal: 85, secured: true, connected: true },
    { ssid: 'Rede-Convidados', signal: 65, secured: true, connected: false },
    { ssid: 'IoT-Network', signal: 45, secured: false, connected: false },
    { ssid: 'Backup-WiFi', signal: 30, secured: true, connected: false },
  ]);
  
  const [scanning, setScanning] = useState(false);
  const [apMode, setApMode] = useState(false);
  const [apPassword, setApPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [networkPassword, setNetworkPassword] = useState('');

  const handleScan = () => {
    setScanning(true);
    toast.info('Escaneando redes...');
    setTimeout(() => {
      setScanning(false);
      toast.success(`${networks.length} redes encontradas`);
    }, 2000);
  };

  const handleConnect = (ssid: string) => {
    if (selectedNetwork === ssid && networkPassword) {
      toast.success(`Conectado: ${ssid}`);
      setNetworks(networks.map(net => ({
        ...net,
        connected: net.ssid === ssid
      })));
      setSelectedNetwork(null);
      setNetworkPassword('');
    } else {
      setSelectedNetwork(ssid);
    }
  };

  const getSignalBars = (signal: number) => {
    const bars = Math.ceil(signal / 25);
    return (
      <div className="flex gap-0.5 items-end h-5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1.5 rounded-t ${bar <= bars ? '' : 'bg-gray-300'}`}
            style={{ height: `${bar * 25}%`, backgroundColor: bar <= bars ? '#336699' : undefined }}
          />
        ))}
      </div>
    );
  };

  const connectedNetwork = networks.find(n => n.connected);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Design 4: Header com Status */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#336699' }}>
          <Wifi className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl" style={{ color: '#002B6B' }}>Configurações de Rede</h1>
          <p className="text-gray-600">Gerencie conexões WiFi e ponto de acesso</p>
        </div>
        <Button onClick={handleScan} disabled={scanning} size="lg">
          <RefreshCw className={`w-5 h-5 mr-2 ${scanning ? 'animate-spin' : ''}`} />
          Escanear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Status - Large Card */}
        <Card className="lg:col-span-2 p-8">
          <h2 className="text-xl mb-6">Status da Conexão</h2>
          
          {connectedNetwork ? (
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: '#336699' }}>
                <Wifi className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Conectado à rede</div>
                <div className="text-3xl mb-2" style={{ color: '#002B6B' }}>{connectedNetwork.ssid}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getSignalBars(connectedNetwork.signal)}
                    <span className="text-sm text-gray-600">{connectedNetwork.signal}% de sinal</span>
                  </div>
                  {connectedNetwork.secured && (
                    <Badge className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Segura
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center">
                <WifiOff className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Desconectado</div>
                <div className="text-3xl" style={{ color: '#002B6B' }}>Sem conexão</div>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Info */}
        <Card className="p-6">
          <h2 className="text-xl mb-4">Informações</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Redes Disponíveis</span>
              <Badge variant="secondary">{networks.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Modo AP</span>
              <Badge variant={apMode ? 'default' : 'secondary'} className={apMode ? 'text-white' : ''} style={apMode ? { backgroundColor: '#336699' } : undefined}>
                {apMode ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Available Networks */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-xl mb-4">Redes Disponíveis</h2>
          
          <div className="space-y-3">
            {networks.map((network) => (
              <div key={network.ssid}>
                <div
                  className="p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md"
                  style={{ 
                    borderColor: network.connected ? '#336699' : '#e5e7eb',
                    backgroundColor: network.connected ? 'rgba(51, 102, 153, 0.05)' : 'white'
                  }}
                  onClick={() => !network.connected && handleConnect(network.ssid)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: network.connected ? '#336699' : 'rgba(51, 102, 153, 0.1)' }}>
                        <Wifi className={`w-6 h-6 ${network.connected ? 'text-white' : ''}`} style={!network.connected ? { color: '#336699' } : undefined} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{network.ssid}</span>
                          {network.secured && <Lock className="w-4 h-4 text-gray-500" />}
                          {network.connected && (
                            <Badge className="text-white" style={{ backgroundColor: '#336699' }}>Conectado</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Sinal: {network.signal}% • {network.secured ? 'Segura' : 'Aberta'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getSignalBars(network.signal)}
                      {!network.connected && (
                        <Button size="sm">Conectar</Button>
                      )}
                    </div>
                  </div>
                </div>

                {selectedNetwork === network.ssid && network.secured && !network.connected && (
                  <div className="ml-4 mt-2 p-4 bg-gray-50 rounded-lg border-2" style={{ borderColor: '#336699' }}>
                    <Label className="text-sm mb-2 block">Senha da Rede</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={networkPassword}
                          onChange={(e) => setNetworkPassword(e.target.value)}
                          placeholder="Digite a senha"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <Button onClick={() => handleConnect(network.ssid)}>
                        Conectar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Access Point Mode */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 102, 153, 0.1)' }}>
              <Globe className="w-5 h-5" style={{ color: '#336699' }} />
            </div>
            <h2 className="text-xl">Modo AP</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label>Habilitar AP</Label>
                <Switch
                  checked={apMode}
                  onCheckedChange={(checked) => {
                    setApMode(checked);
                    toast.info(checked ? 'AP ativado' : 'AP desativado');
                  }}
                />
              </div>
              <p className="text-xs text-gray-600">
                {apMode ? 'Modo ativo' : 'Modo desativado'}
              </p>
            </div>

            {apMode && (
              <>
                <div>
                  <Label>Nome da Rede (SSID)</Label>
                  <Input
                    type="text"
                    defaultValue="PigCount-AP"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Senha</Label>
                  <div className="relative mt-2">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={apPassword}
                      onChange={(e) => setApPassword(e.target.value)}
                      placeholder="Mín. 8 caracteres"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full text-white hover:opacity-90" style={{ backgroundColor: '#336699' }} onClick={() => toast.success('AP configurado!')}>
                  Salvar Configurações
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
