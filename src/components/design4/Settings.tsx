import { useState } from 'react';
import { Settings as SettingsIcon, Camera, Volume2, Zap, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [settings, setSettings] = useState({
    linePosition: 50,
    sensitivity: 75,
    minWeight: 10,
    maxWeight: 100,
    autoSave: true,
    soundEnabled: true,
    flashEnabled: true,
  });

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Design 4: Header com Ícone Grande */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#336699' }}>
          <SettingsIcon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl" style={{ color: '#002B6B' }}>Configurações</h1>
          <p className="text-gray-600">Personalize o comportamento do sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 102, 153, 0.1)' }}>
              <Camera className="w-5 h-5" style={{ color: '#336699' }} />
            </div>
            <h2 className="text-xl">Câmera</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Posição da Linha</Label>
                <span className="text-sm px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#336699' }}>
                  {settings.linePosition}%
                </span>
              </div>
              <Slider
                value={[settings.linePosition]}
                onValueChange={([value]) => setSettings({ ...settings, linePosition: value })}
                min={0}
                max={100}
                step={1}
              />
              <div className="mt-4 bg-gray-100 rounded-lg p-4">
                <div className="relative bg-gray-300 h-32 rounded">
                  <div 
                    className="absolute left-0 right-0 h-1 shadow-lg"
                    style={{ top: `${settings.linePosition}%`, backgroundColor: '#336699' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Sensibilidade</Label>
                <span className="text-sm px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#336699' }}>
                  {settings.sensitivity}%
                </span>
              </div>
              <Slider
                value={[settings.sensitivity]}
                onValueChange={([value]) => setSettings({ ...settings, sensitivity: value })}
                min={0}
                max={100}
                step={5}
              />
            </div>
          </div>
        </Card>

        {/* Weight Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 102, 153, 0.1)' }}>
              <Zap className="w-5 h-5" style={{ color: '#336699' }} />
            </div>
            <h2 className="text-xl">Limites de Peso</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="minWeight">Peso Mínimo (kg)</Label>
              <Input
                id="minWeight"
                type="number"
                value={settings.minWeight}
                onChange={(e) => setSettings({ ...settings, minWeight: Number(e.target.value) })}
                className="mt-2 h-12"
              />
            </div>
            <div>
              <Label htmlFor="maxWeight">Peso Máximo (kg)</Label>
              <Input
                id="maxWeight"
                type="number"
                value={settings.maxWeight}
                onChange={(e) => setSettings({ ...settings, maxWeight: Number(e.target.value) })}
                className="mt-2 h-12"
              />
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 102, 153, 0.1)' }}>
              <Volume2 className="w-5 h-5" style={{ color: '#336699' }} />
            </div>
            <h2 className="text-xl">Sistema</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 rounded-lg" style={{ borderColor: settings.autoSave ? '#336699' : '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-3">
                <Label>Salvamento Automático</Label>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
                />
              </div>
              <p className="text-sm text-gray-600">Salvar parciais automaticamente</p>
            </div>

            <div className="p-4 border-2 rounded-lg" style={{ borderColor: settings.soundEnabled ? '#336699' : '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-3">
                <Label>Alertas Sonoros</Label>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                />
              </div>
              <p className="text-sm text-gray-600">Som ao detectar cruzamento</p>
            </div>

            <div className="p-4 border-2 rounded-lg" style={{ borderColor: settings.flashEnabled ? '#336699' : '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-3">
                <Label>Flash Visual</Label>
                <Switch
                  checked={settings.flashEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, flashEnabled: checked })}
                />
              </div>
              <p className="text-sm text-gray-600">Feedback visual colorido</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <Button onClick={handleSave} size="lg" className="w-full h-14 text-lg text-white hover:opacity-90" style={{ backgroundColor: '#336699' }}>
          <Save className="w-5 h-5 mr-2" />
          Salvar Todas as Configurações
        </Button>
      </div>
    </div>
  );
}
