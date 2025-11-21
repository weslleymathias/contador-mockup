import { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, Eye, EyeOff, Signal, Lock, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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

  const handleScan = () => {
    setScanning(true);
    toast.info('Escaneando...');
    setTimeout(() => {
      setScanning(false);
      toast.success(`${networks.length} redes encontradas`);
    }, 2000);
  };

  const connectedNetwork = networks.find(n => n.connected);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1" style={{ color: '#002B6B' }}>Rede</h2>
          <p className="text-sm text-gray-600">Gerencie conexões e configurações de rede</p>
        </div>
        <Button onClick={handleScan} disabled={scanning}>
          <RefreshCw className={`w-4 h-4 mr-2 ${scanning ? 'animate-spin' : ''}`} />
          Escanear
        </Button>
      </div>

      {/* Connection Status Banner */}
      <Card className="p-6 mb-6" style={{ borderLeft: '4px solid ' + (connectedNetwork ? '#336699' : '#ef4444') }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white" 
            style={{ backgroundColor: connectedNetwork ? '#336699' : '#ef4444' }}>
            {connectedNetwork ? <Wifi className="w-7 h-7" /> : <WifiOff className="w-7 h-7" />}
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600">Status da Conexão</div>
            <div className="text-2xl" style={{ color: '#002B6B' }}>
              {connectedNetwork ? connectedNetwork.ssid : 'Desconectado'}
            </div>
            {connectedNetwork && (
              <div className="text-sm text-gray-600 mt-1">Sinal: {connectedNetwork.signal}%</div>
            )}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="wifi" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="wifi">Redes WiFi</TabsTrigger>
          <TabsTrigger value="ap">Ponto de Acesso</TabsTrigger>
        </TabsList>

        <TabsContent value="wifi">
          <div className="space-y-3">
            {networks.map((network) => (
              <Card key={network.ssid} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      network.connected ? 'text-white' : ''
                    }`} style={{ backgroundColor: network.connected ? '#336699' : 'rgba(51, 102, 153, 0.1)' }}>
                      <Wifi className="w-6 h-6" style={!network.connected ? { color: '#336699' } : undefined} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{network.ssid}</span>
                        {network.secured && <Lock className="w-4 h-4 text-gray-500" />}
                      </div>
                      <div className="text-sm text-gray-500">
                        {network.signal}% de sinal • {network.secured ? 'Segura' : 'Aberta'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1.5 rounded-t ${
                            bar <= Math.ceil(network.signal / 25) ? '' : 'bg-gray-300'
                          }`}
                          style={{ 
                            height: `${bar * 6}px`,
                            backgroundColor: bar <= Math.ceil(network.signal / 25) ? '#336699' : undefined
                          }}
                        />
                      ))}
                    </div>
                    {network.connected ? (
                      <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#336699' }}>
                        <Check className="w-4 h-4" />
                        Conectado
                      </div>
                    ) : (
                      <Button size="sm">Conectar</Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ap">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg mb-1" style={{ color: '#002B6B' }}>Modo Ponto de Acesso</h3>
                <p className="text-sm text-gray-600">Permita que outros dispositivos se conectem diretamente</p>
              </div>
              <Switch
                checked={apMode}
                onCheckedChange={(checked) => {
                  setApMode(checked);
                  toast.info(checked ? 'AP ativado' : 'AP desativado');
                }}
              />
            </div>

            {apMode && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Nome da Rede (SSID)</Label>
                  <Input
                    type="text"
                    defaultValue="PigCount-AP"
                    className="h-12"
                  />
                </div>

                <div>
                  <Label className="text-sm mb-2 block">Senha</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={apPassword}
                      onChange={(e) => setApPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full h-12 text-white hover:opacity-90" style={{ backgroundColor: '#336699' }} onClick={() => toast.success('AP configurado!')}>
                  Salvar Configurações
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
