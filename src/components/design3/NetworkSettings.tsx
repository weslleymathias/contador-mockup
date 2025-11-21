import { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, Eye, EyeOff, Signal, Lock, Globe } from 'lucide-react';
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
    toast.info('Escaneando redes disponíveis...');
    
    setTimeout(() => {
      setScanning(false);
      toast.success(`${networks.length} rede(s) encontrada(s)`);
    }, 2000);
  };

  const handleConnect = (ssid: string) => {
    if (selectedNetwork === ssid && networkPassword) {
      toast.success(`Conectado à rede: ${ssid}`);
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
            className={`w-1 rounded-t ${bar <= bars ? '' : 'bg-gray-300'}`}
            style={{ height: `${bar * 25}%`, backgroundColor: bar <= bars ? '#336699' : undefined }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <Wifi className="w-8 h-8" style={{ color: '#336699' }} />
          <h1 className="text-3xl">Configurações de Rede</h1>
        </div>
        <p className="text-gray-600">Gerencie conexões WiFi e modo AP</p>
      </div>

      <Card className="p-6 mb-6 bg-slate-50 border" style={{ borderColor: '#336699' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {networks.find(n => n.connected) ? (
              <>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(51, 102, 153, 0.2)' }}>
                  <Wifi className="w-6 h-6" style={{ color: '#336699' }} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Conectado à rede</div>
                  <div className="text-xl">{networks.find(n => n.connected)?.ssid}</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-red-100 rounded-full">
                  <WifiOff className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Desconectado</div>
                  <div className="text-xl">Nenhuma rede conectada</div>
                </div>
              </>
            )}
          </div>
          {networks.find(n => n.connected) && (
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {getSignalBars(networks.find(n => n.connected)?.signal || 0)}
            </Badge>
          )}
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Redes Disponíveis</h2>
          <Button onClick={handleScan} disabled={scanning} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${scanning ? 'animate-spin' : ''}`} />
            {scanning ? 'Escaneando...' : 'Escanear'}
          </Button>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          {networks.length} rede(s) encontrada(s)
        </div>

        <div className="space-y-2">
          {networks.map((network) => (
            <div key={network.ssid}>
              <div
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  network.connected
                    ? 'border-gray-200 hover:border-gray-300'
                    : selectedNetwork === network.ssid
                    ? 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                style={network.connected ? { backgroundColor: 'rgba(51, 102, 153, 0.1)', borderColor: '#336699' } : 
                       selectedNetwork === network.ssid ? { borderColor: '#336699' } : undefined}
                onClick={() => !network.connected && handleConnect(network.ssid)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Signal className="w-5 h-5" style={{ color: '#336699' }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{network.ssid}</span>
                        {network.secured && <Lock className="w-3 h-3 text-gray-500" />}
                        {network.connected && (
                          <Badge className="text-white" style={{ backgroundColor: '#336699' }}>Conectado</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Sinal: {network.signal}% • {network.secured ? 'Segura' : 'Aberta'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getSignalBars(network.signal)}
                    {!network.connected && (
                      <Button size="sm">
                        Conectar
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {selectedNetwork === network.ssid && network.secured && !network.connected && (
                <div className="ml-4 mr-4 mt-2 p-4 bg-gray-50 rounded-lg border-2" style={{ borderColor: '#336699' }}>
                  <Label htmlFor={`password-${network.ssid}`} className="text-sm">Senha da Rede</Label>
                  <div className="flex gap-2 mt-2">
                    <div className="relative flex-1">
                      <Input
                        id={`password-${network.ssid}`}
                        type={showPassword ? 'text' : 'password'}
                        value={networkPassword}
                        onChange={(e) => setNetworkPassword(e.target.value)}
                        placeholder="Digite a senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-6 h-6" style={{ color: '#336699' }} />
          <h2 className="text-xl">Modo Ponto de Acesso (AP)</h2>
        </div>

        <div className="bg-slate-50 border rounded-lg p-4 mb-4" style={{ borderColor: '#336699' }}>
          <p className="text-sm text-slate-700">
            Ative o modo AP para permitir que outros dispositivos se conectem diretamente
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex-1">
              <Label className="text-base">Habilitar Modo AP</Label>
              <p className="text-sm text-gray-600 mt-1">
                {apMode ? 'Modo AP está ativo' : 'Modo AP está desativado'}
              </p>
            </div>
            <Switch
              checked={apMode}
              onCheckedChange={(checked) => {
                setApMode(checked);
                toast.info(checked ? 'Modo AP ativado' : 'Modo AP desativado');
              }}
            />
          </div>

          {apMode && (
            <>
              <div>
                <Label htmlFor="apSsid">Nome da Rede (SSID)</Label>
                <Input
                  id="apSsid"
                  type="text"
                  defaultValue="PigCount-AP"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="apPassword">Senha da Rede AP</Label>
                <div className="relative mt-2">
                  <Input
                    id="apPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={apPassword}
                    onChange={(e) => setApPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button className="w-full text-white hover:opacity-90" style={{ backgroundColor: '#336699' }} onClick={() => toast.success('Configurações do AP salvas!')}>
                Salvar Configurações do AP
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
