import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [settings, setSettings] = useState({
    direction: 'left-right',
    beepCount: 50,
    manualFocus: 70,
    linePosition: 288,
    recordVideos: false,
    maintenanceMode: true,
  });

  const handleSave = () => {
    toast.success('Configuração salva com sucesso');
  };

  const handleCreateUser = () => {
    toast.info('Criar novo usuário');
  };

  const handleRestart = () => {
    toast.warning('Reiniciar dispositivo');
  };

  return (
    <div className="px-4 pb-4">
      <h2 className="text-xl mb-4 text-center">Configurações</h2>

      <div className="space-y-4">
        {/* Direção */}
        <div className="bg-gray-50 p-3 rounded">
          <Label className="text-sm mb-2 block">Direção:</Label>
          <Select value={settings.direction} onValueChange={(value) => setSettings({ ...settings, direction: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left-right">Esquerda → Direita</SelectItem>
              <SelectItem value="right-left">Direita → Esquerda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apitar ao passar X indivíduos */}
        <div className="bg-gray-50 p-3 rounded">
          <Label className="text-sm mb-2 block">Apitar ao passar X indivíduos:</Label>
          <Input
            type="number"
            value={settings.beepCount}
            onChange={(e) => setSettings({ ...settings, beepCount: Number(e.target.value) })}
          />
        </div>

        {/* Foco Manual */}
        <div className="bg-gray-50 p-3 rounded">
          <Label className="text-sm mb-2 block">Foco Manual:</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[settings.manualFocus]}
              onValueChange={([value]) => setSettings({ ...settings, manualFocus: value })}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.manualFocus}
              onChange={(e) => setSettings({ ...settings, manualFocus: Number(e.target.value) })}
              className="w-20"
            />
          </div>
        </div>

        {/* Posição da Linha */}
        <div className="bg-gray-50 p-3 rounded">
          <Label className="text-sm mb-2 block">Posição da Linha:</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[settings.linePosition]}
              onValueChange={([value]) => setSettings({ ...settings, linePosition: value })}
              min={0}
              max={500}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.linePosition}
              onChange={(e) => setSettings({ ...settings, linePosition: Number(e.target.value) })}
              className="w-20"
            />
          </div>
        </div>

        {/* Gravar Vídeos */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Gravar Vídeos:</Label>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.recordVideos}
                onCheckedChange={(checked) => setSettings({ ...settings, recordVideos: checked })}
              />
              <span className="text-sm text-gray-600">
                {settings.recordVideos ? 'Habilitado' : 'Desabilitado'}
              </span>
            </div>
          </div>
        </div>

        {/* Modo Manutenção */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Modo Manutenção:</Label>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
              <span className="text-sm text-gray-600">
                {settings.maintenanceMode ? 'AP (Padrão)' : 'Desabilitado'}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-2">
          <Button 
            onClick={handleSave}
            className="w-full text-white"
            style={{ backgroundColor: '#336699' }}
            size="lg"
          >
            Salvar Configurações
          </Button>
          
          <Button 
            onClick={handleCreateUser}
            className="w-full text-white"
            style={{ backgroundColor: '#002B6B' }}
            size="lg"
          >
            Criar Novo Usuário
          </Button>
          
          <Button 
            onClick={handleRestart}
            className="w-full text-white"
            style={{ backgroundColor: '#002B6B' }}
            size="lg"
          >
            Reiniciar Dispositivo
          </Button>
        </div>
      </div>
    </div>
  );
}