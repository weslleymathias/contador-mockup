import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
    toast.success('Configurações salvas!');
  };

  return (
    <div className="p-6">
      {/* Design 5: Tabs Layout */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1" style={{ color: '#002B6B' }}>Configurações</h2>
          <p className="text-sm text-gray-600">Personalize o sistema conforme suas necessidades</p>
        </div>
        <Button onClick={handleSave} size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#336699' }}>
          <Save className="w-5 h-5 mr-2" />
          Salvar
        </Button>
      </div>

      <Tabs defaultValue="camera" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="camera">Câmera</TabsTrigger>
          <TabsTrigger value="weight">Peso</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="camera">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg mb-6" style={{ color: '#002B6B' }}>Posição da Linha</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Posição Vertical</Label>
                  <span className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: '#336699' }}>
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
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg mb-6" style={{ color: '#002B6B' }}>Pré-visualização</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="relative bg-gray-300 h-48 rounded">
                  <div 
                    className="absolute left-0 right-0 h-1 shadow-lg"
                    style={{ top: `${settings.linePosition}%`, backgroundColor: '#336699' }}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 col-span-2">
              <h3 className="text-lg mb-6" style={{ color: '#002B6B' }}>Sensibilidade de Detecção</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Nível de Sensibilidade</Label>
                  <span className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: '#336699' }}>
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
                <p className="text-sm text-gray-600">Ajuste a sensibilidade para detectar movimentos menores ou maiores</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weight">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg mb-6" style={{ color: '#002B6B' }}>Peso Mínimo</h3>
              <Input
                type="number"
                value={settings.minWeight}
                onChange={(e) => setSettings({ ...settings, minWeight: Number(e.target.value) })}
                className="h-14 text-xl"
                suffix="kg"
              />
              <p className="text-sm text-gray-600 mt-2">Limite inferior aceitável para registro</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg mb-6" style={{ color: '#002B6B' }}>Peso Máximo</h3>
              <Input
                type="number"
                value={settings.maxWeight}
                onChange={(e) => setSettings({ ...settings, maxWeight: Number(e.target.value) })}
                className="h-14 text-xl"
                suffix="kg"
              />
              <p className="text-sm text-gray-600 mt-2">Limite superior aceitável para registro</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg" style={{ color: '#002B6B' }}>Salvamento Automático</h3>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
                />
              </div>
              <p className="text-sm text-gray-600">Salvar parciais automaticamente a cada 5 minutos</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg" style={{ color: '#002B6B' }}>Alertas Sonoros</h3>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                />
              </div>
              <p className="text-sm text-gray-600">Reproduzir som ao detectar cruzamento da linha</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg" style={{ color: '#002B6B' }}>Flash Visual</h3>
                <Switch
                  checked={settings.flashEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, flashEnabled: checked })}
                />
              </div>
              <p className="text-sm text-gray-600">Exibir feedback visual colorido na detecção</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
