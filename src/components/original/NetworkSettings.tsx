import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';

export function NetworkSettings() {
  const [apSettings, setApSettings] = useState({
    ssid: 'PigCount-001',
    password: '••••••••',
    showPassword: false,
  });

  const [wifiSettings, setWifiSettings] = useState({
    selectedNetwork: '',
    password: '',
    showPassword: false,
  });

  const [networksFound, setNetworksFound] = useState(4);
  const [scanning, setScanning] = useState(false);

  const handleSaveAP = () => {
    toast.success('Configurações do AP salvas!');
  };

  const handleSaveWiFi = () => {
    if (!wifiSettings.selectedNetwork) {
      toast.error('Selecione uma rede WiFi');
      return;
    }
    if (!wifiSettings.password) {
      toast.error('Digite a senha da rede');
      return;
    }
    toast.success('Configurações WiFi salvas!');
  };

  const handleScan = () => {
    setScanning(true);
    toast.info('Escaneando redes...');
    
    setTimeout(() => {
      const found = Math.floor(Math.random() * 5) + 3;
      setNetworksFound(found);
      setScanning(false);
      toast.success(`${found} rede(s) encontrada(s)`);
    }, 2000);
  };

  return (
    <div className="px-4 pb-4">
      <h2 className="text-xl mb-4 text-center">Configurações de Rede</h2>

      {/* Access Point Mode Section */}
      <div className="mb-6">
        <h3 className="mb-3">Configurar Access Point (Modo AP)</h3>
        
        <div className="bg-gray-50 border rounded-lg p-3 mb-4" style={{ borderColor: '#336699' }}>
          <p className="text-xs text-gray-700">
            Configure o nome e senha da rede WiFi que o dispositivo criará quando estiver em modo Access Point (modo manutenção).
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-sm mb-2 block">Nome da Rede (SSID do AP):</Label>
            <Input
              type="text"
              value={apSettings.ssid}
              onChange={(e) => setApSettings({ ...apSettings, ssid: e.target.value })}
            />
          </div>

          <div>
            <Label className="text-sm mb-2 block">Senha do Access Point:</Label>
            <Input
              type={apSettings.showPassword ? 'text' : 'password'}
              value={apSettings.password}
              onChange={(e) => setApSettings({ ...apSettings, password: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="showApPassword"
              checked={apSettings.showPassword}
              onCheckedChange={(checked) => setApSettings({ ...apSettings, showPassword: checked as boolean })}
            />
            <Label htmlFor="showApPassword" className="text-sm cursor-pointer">
              Mostrar senha
            </Label>
          </div>

          <Button 
            onClick={handleSaveAP}
            className="w-full text-white"
            style={{ backgroundColor: '#002B6B' }}
          >
            Salvar Configurações do AP
          </Button>
        </div>
      </div>

      {/* WiFi Client Mode Section */}
      <div className="mb-4">
        <h3 className="mb-3">Conectar a Rede WiFi (Modo Cliente)</h3>
        
        <div className="bg-gray-50 border rounded-lg p-3 mb-4" style={{ borderColor: '#336699' }}>
          <p className="text-xs text-gray-700">
            Configure a rede WiFi que o dispositivo irá se conectar quando estiver em modo WiFi (manutenção).
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-sm mb-2 block">Rede WiFi:</Label>
            <div className="flex gap-2">
              <Select value={wifiSettings.selectedNetwork} onValueChange={(value) => setWifiSettings({ ...wifiSettings, selectedNetwork: value })}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione uma rede..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wifi-1">WiFi-Principal</SelectItem>
                  <SelectItem value="wifi-2">Rede-Convidados</SelectItem>
                  <SelectItem value="wifi-3">IoT-Network</SelectItem>
                  <SelectItem value="wifi-4">Backup-WiFi</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleScan}
                variant="outline"
                style={{ borderColor: '#002B6B', color: '#002B6B' }}
                disabled={scanning}
              >
                {scanning ? 'Escaneando...' : 'Escanear'}
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm mb-2 block">Senha da Rede:</Label>
            <Input
              type={wifiSettings.showPassword ? 'text' : 'password'}
              value={wifiSettings.password}
              onChange={(e) => setWifiSettings({ ...wifiSettings, password: e.target.value })}
              placeholder="Digite a senha"
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="showWifiPassword"
              checked={wifiSettings.showPassword}
              onCheckedChange={(checked) => setWifiSettings({ ...wifiSettings, showPassword: checked as boolean })}
            />
            <Label htmlFor="showWifiPassword" className="text-sm cursor-pointer">
              Mostrar senha
            </Label>
          </div>

          <Button 
            onClick={handleSaveWiFi}
            className="w-full text-white"
            style={{ backgroundColor: '#002B6B' }}
          >
            Salvar Configurações WiFi
          </Button>
        </div>
      </div>

      {/* Networks Found */}
      <div className="text-center text-sm text-gray-600">
        {networksFound} rede(s) encontrada(s).
      </div>
    </div>
  );
}
