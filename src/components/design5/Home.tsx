import { useState } from 'react';
import { Plus, Minus, Check, X, Play, Pause, Square } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
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
  const [linePosition, setLinePosition] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [crossingDirection, setCrossingDirection] = useState<'up' | 'down' | null>(null);

  const addCount = (increment: number) => {
    setCount(prev => prev + increment);
    setCrossingDirection(increment > 0 ? 'down' : 'up');
    setTimeout(() => setCrossingDirection(null), 300);
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
      toast.error('Adicione pelo menos uma parcial');
      return;
    }
    setShowFinishDialog(true);
  };

  const confirmFinish = () => {
    toast.success('Contagem finalizada!');
    setCount(0);
    setPartials([]);
    setShowFinishDialog(false);
    setIsRunning(false);
  };

  const totalWeight = partials.reduce((sum, p) => sum + p.weight, 0);

  return (
    <div className="p-4 md:p-6">
      {/* Design 5: Layout tipo Dashboard com Grid */}
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl mb-1" style={{ color: '#002B6B' }}>Contagem em Andamento</h2>
            <p className="text-sm text-gray-600">Monitore e controle a contagem em tempo real</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant="outline"
              size="lg"
              className={isRunning ? 'border-red-500 text-red-600' : ''}
            >
              {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isRunning ? 'Pausar' : 'Iniciar'}
            </Button>
            <Button
              onClick={finishCount}
              size="lg"
              className="text-white hover:opacity-90"
              style={{ backgroundColor: '#336699' }}
            >
              <Square className="w-5 h-5 mr-2" />
              Finalizar
            </Button>
          </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-white rounded-xl p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#002B6B' }}>
          <div className="text-xs md:text-sm text-gray-600 mb-2">Contagem Total</div>
          <div className="text-3xl md:text-5xl tabular-nums" style={{ color: '#002B6B' }}>{count}</div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#336699' }}>
          <div className="text-xs md:text-sm text-gray-600 mb-2">Parciais</div>
          <div className="text-3xl md:text-5xl tabular-nums" style={{ color: '#336699' }}>{partials.length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#336699' }}>
          <div className="text-xs md:text-sm text-gray-600 mb-2">Peso Total (kg)</div>
          <div className="text-3xl md:text-5xl tabular-nums" style={{ color: '#336699' }}>{totalWeight.toFixed(0)}</div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#336699' }}>
          <div className="text-xs md:text-sm text-gray-600 mb-2">Status</div>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-base md:text-lg" style={{ color: '#002B6B' }}>{isRunning ? 'Ativo' : 'Pausado'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Camera - Larger */}
        <div className="lg:col-span-2">
          <Card className="p-4 md:p-6 h-full">
            <h3 className="mb-3 md:mb-4 text-base md:text-lg">Visualização da Câmera</h3>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden h-[300px] md:h-[500px]">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-gray-500">Feed da Câmera</span>
              </div>
              
              <div 
                className="absolute left-0 right-0 h-1 shadow-lg transition-all"
                style={{ top: `${linePosition}%`, backgroundColor: '#336699' }}
              >
                <div className="absolute inset-0 blur-sm" style={{ backgroundColor: '#336699' }}></div>
              </div>

              {crossingDirection && (
                <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{ backgroundColor: crossingDirection === 'down' ? 'rgba(51, 102, 153, 0.3)' : 'rgba(0, 43, 107, 0.3)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {crossingDirection === 'down' ? (
                      <Check className="w-24 h-24" style={{ color: '#336699' }} strokeWidth={3} />
                    ) : (
                      <X className="w-24 h-24" style={{ color: '#002B6B' }} strokeWidth={3} />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Controls Below Camera */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <Button
                onClick={() => addCount(-1)}
                variant="outline"
                size="lg"
                disabled={count === 0}
                className="h-12 md:h-16"
              >
                <Minus className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                <span className="hidden md:inline">Decrementar</span>
                <span className="md:hidden">-1</span>
              </Button>
              <Button
                onClick={() => addCount(1)}
                size="lg"
                className="h-12 md:h-16 text-white hover:opacity-90"
                style={{ backgroundColor: '#336699' }}
              >
                <Plus className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                <span className="hidden md:inline">Incrementar</span>
                <span className="md:hidden">+1</span>
              </Button>
              <Button
                onClick={addPartial}
                disabled={count === 0}
                variant="outline"
                size="lg"
                className="h-12 md:h-16"
              >
                <Check className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                Parcial
              </Button>
            </div>
          </Card>
        </div>

        {/* Partials Sidebar */}
        <div>
          <Card className="p-6" style={{ height: '646px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="mb-4 text-lg">Parciais Registradas</h3>
            
            <div className="flex-1 overflow-auto space-y-3 mb-4">
              {partials.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center text-gray-400">
                  <div>
                    <p className="mb-1">Nenhuma parcial</p>
                    <p className="text-xs">Registre parciais para acompanhar</p>
                  </div>
                </div>
              ) : (
                partials.map((partial) => (
                  <div
                    key={partial.id}
                    className="p-4 rounded-lg border-2"
                    style={{ borderColor: '#336699', backgroundColor: 'rgba(51, 102, 153, 0.05)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">
                        {partial.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-600">Contagem</div>
                        <div className="text-xl" style={{ color: '#002B6B' }}>{partial.count}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Peso</div>
                        <div className="text-xl" style={{ color: '#336699' }}>{partial.weight.toFixed(1)}kg</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Contagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Contagem: <strong>{count}</strong> • Parciais: <strong>{partials.length}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFinish} className="text-white hover:opacity-90" style={{ backgroundColor: '#336699' }}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}