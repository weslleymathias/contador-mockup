import { useState } from 'react';
import { Plus, Minus, AlertCircle, Undo2, Check, X, Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

type Partial = {
  id: string;
  count: number;
  weight: number;
  timestamp: Date;
};

export function Home() {
  const [count, setCount] = useState(0);
  const [partials, setPartials] = useState<Partial[]>([]);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const addCount = (increment: number) => {
    setCount(prev => prev + increment);
    toast.success(`${increment > 0 ? '+' : ''}${increment}`, { duration: 1000 });
  };

  const addPartial = () => {
    const newPartial: Partial = {
      id: Date.now().toString(),
      count: count,
      weight: Math.round((Math.random() * 50 + 50) * 100) / 100,
      timestamp: new Date(),
    };
    setPartials([newPartial, ...partials]);
    toast.success('Parcial adicionada!');
  };

  const finishCount = () => {
    if (partials.length === 0) {
      toast.error('Adicione pelo menos uma parcial antes de finalizar');
      return;
    }
    setShowFinishDialog(true);
  };

  const confirmFinish = () => {
    toast.success('Contagem finalizada com sucesso!');
    setCount(0);
    setPartials([]);
    setShowFinishDialog(false);
  };

  const totalWeight = partials.reduce((sum, p) => sum + p.weight, 0);
  const avgWeight = partials.length > 0 ? totalWeight / partials.length : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Large Counter Display */}
      <Card className="p-8 border-2" style={{ borderColor: '#336699' }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center lg:text-left">
            <div className="text-gray-600 mb-2">Contagem Atual</div>
            <div className="text-9xl tabular-nums" style={{ color: '#002B6B' }}>{count}</div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button size="lg" onClick={() => addCount(1)} className="text-white px-8" style={{ backgroundColor: '#336699' }}>
                <Plus className="w-6 h-6 mr-2" />
                Adicionar
              </Button>
              <Button size="lg" onClick={() => addCount(-1)} variant="outline" disabled={count === 0} className="px-8">
                <Minus className="w-6 h-6 mr-2" />
                Remover
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsPaused(!isPaused)} className="flex-1">
                {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                {isPaused ? 'Retomar' : 'Pausar'}
              </Button>
              <Button variant="ghost" onClick={() => setCount(0)} disabled={count === 0}>
                <Undo2 className="w-4 h-4 mr-2" />
                Resetar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center" style={{ backgroundColor: '#002B6B' }}>
          <div className="text-blue-200 text-sm mb-2">Total de Parciais</div>
          <div className="text-5xl text-white">{partials.length}</div>
        </Card>
        <Card className="p-6 text-center" style={{ backgroundColor: '#336699' }}>
          <div className="text-blue-100 text-sm mb-2">Peso Acumulado</div>
          <div className="text-5xl text-white">{totalWeight.toFixed(1)}<span className="text-2xl ml-2">kg</span></div>
        </Card>
        <Card className="p-6 text-center bg-slate-700">
          <div className="text-slate-300 text-sm mb-2">Peso Médio</div>
          <div className="text-5xl text-white">{avgWeight.toFixed(1)}<span className="text-2xl ml-2">kg</span></div>
        </Card>
      </div>

      {/* Camera and Partials Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera */}
        <Card className="p-6">
          <h3 className="mb-4">Feed da Câmera</h3>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-gray-500">Câmera em {isPaused ? 'pausa' : 'operação'}</span>
            </div>
            <div className="absolute left-0 right-0 h-1 top-1/2 shadow-lg" style={{ backgroundColor: '#336699' }}>
              <div className="absolute inset-0 blur-sm" style={{ backgroundColor: '#336699' }}></div>
            </div>
          </div>
        </Card>

        {/* Partials */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3>Parciais Registradas</h3>
            <Button onClick={addPartial} size="sm" disabled={count === 0} className="text-white" style={{ backgroundColor: '#336699' }}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Parcial
            </Button>
          </div>

          {partials.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Nenhuma parcial registrada</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {partials.map((partial, index) => (
                <div key={partial.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: '#336699' }}>
                      {index + 1}
                    </div>
                    <div>
                      <div>Contagem: <strong>{partial.count}</strong></div>
                      <div className="text-sm text-gray-600">Peso: {partial.weight.toFixed(2)} kg</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {partial.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {partials.length > 0 && (
            <Button onClick={finishCount} className="w-full mt-4 text-white" style={{ backgroundColor: '#336699' }}>
              <Check className="w-5 h-5 mr-2" />
              Finalizar Contagem
            </Button>
          )}
        </Card>
      </div>

      <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Contagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a finalizar a contagem com <strong>{partials.length} parciais</strong> e contagem total de <strong>{count}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFinish} className="text-white" style={{ backgroundColor: '#336699' }}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
