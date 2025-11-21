import { useState } from 'react';
import { Settings as SettingsIcon, HelpCircle, RotateCcw } from 'lucide-react';
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

  const handleReset = () => {
    setSettings({
      linePosition: 50,
      sensitivity: 75,
      minWeight: 10,
      maxWeight: 100,
      autoSave: true,
      soundEnabled: true,
      flashEnabled: true,
    });
    toast.info('Configurações restauradas para o padrão');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8" style={{ color: '#336699' }} />
          <h1 className="text-3xl">Configurações</h1>
        </div>
        <p className="text-gray-600">Personalize o comportamento do sistema</p>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="text-xl mb-4">Configurações da Câmera</h2>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Posição da Linha de Contagem</Label>
              <span className="text-sm text-gray-600">{settings.linePosition}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-12">Topo</span>
              <Slider
                value={[settings.linePosition]}
                onValueChange={([value]) => setSettings({ ...settings, linePosition: value })}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-gray-500 w-12 text-right">Base</span>
            </div>
            <div className="mt-3 bg-gray-100 rounded-lg p-4 border-2 border-gray-200">
              <div className="relative bg-gray-300 h-32 rounded">
                <div 
                  className="absolute left-0 right-0 h-1 shadow-lg"
                  style={{ top: `${settings.linePosition}%`, backgroundColor: '#336699' }}
                />
              </div>
              <p className="text-xs text-gray-600 text-center mt-2">Pré-visualização</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Sensibilidade de Detecção</Label>
              <span className="text-sm text-gray-600">{settings.sensitivity}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-12">Baixa</span>
              <Slider
                value={[settings.sensitivity]}
                onValueChange={([value]) => setSettings({ ...settings, sensitivity: value })}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-xs text-gray-500 w-12 text-right">Alta</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-xl mb-4">Configurações de Peso</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minWeight">Peso Mínimo (kg)</Label>
            <Input
              id="minWeight"
              type="number"
              value={settings.minWeight}
              onChange={(e) => setSettings({ ...settings, minWeight: Number(e.target.value) })}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="maxWeight">Peso Máximo (kg)</Label>
            <Input
              id="maxWeight"
              type="number"
              value={settings.maxWeight}
              onChange={(e) => setSettings({ ...settings, maxWeight: Number(e.target.value) })}
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-xl mb-4">Configurações do Sistema</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex-1">
              <Label className="text-base">Salvamento Automático</Label>
              <p className="text-sm text-gray-600 mt-1">Salvar parciais automaticamente</p>
            </div>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex-1">
              <Label className="text-base">Alertas Sonoros</Label>
              <p className="text-sm text-gray-600 mt-1">Reproduzir som ao detectar</p>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex-1">
              <Label className="text-base">Flash Visual</Label>
              <p className="text-sm text-gray-600 mt-1">Exibir feedback visual colorido</p>
            </div>
            <Switch
              checked={settings.flashEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, flashEnabled: checked })}
            />
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleReset} variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar Padrão
        </Button>
        <Button onClick={handleSave} className="flex-1 text-white hover:opacity-90" style={{ backgroundColor: '#336699' }}>
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
