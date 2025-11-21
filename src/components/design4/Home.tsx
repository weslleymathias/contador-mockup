import { useState } from 'react';
import { Plus, Minus, AlertCircle, Undo2, Check, X, TrendingUp, Package } from 'lucide-react';
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
  const [crossingDirection, setCrossingDirection] = useState<'up' | 'down' | null>(null);

  const addCount = (increment: number) => {
    setCount(prev => prev + increment);
    setCrossingDirection(increment > 0 ? 'down' : 'up');
    setTimeout(() => setCrossingDirection(null), 300);
    toast.success(`${increment > 0 ? '+' : ''}${increment}`, {
      duration: 1000,
    });
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

  const undoLastCount = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
      toast.info('Última contagem desfeita');
    }
  };

  const removePartial = (id: string) => {
    setPartials(partials.filter(p => p.id !== id));
    toast.success('Parcial removida');
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
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Design 4: Layout em Cards Horizontais */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2" style={{ color: '#002B6B' }}>Contagem em Tempo Real</h1>
        <p className="text-gray-600">Sistema de contagem e pesagem de animais</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6" style={{ borderLeft: '4px solid #336699' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Contagem Atual</div>
              <div className="text-4xl" style={{ color: '#002B6B' }}>{count}</div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 102, 153, 0.1)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: '#336699' }} />
            </div>
          </div>
        </Card>

        <Card className="p-6" style={{ borderLeft: '4px solid #336699' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Parciais</div>
              <div className="text-4xl" style={{ color: '#002B6B' }}>{partials.length}</div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 102, 153, 0.1)' }}>
              <Package className="w-6 h-6" style={{ color: '#336699' }} />
            </div>
          </div>
        </Card>

        <Card className="p-6" style={{ borderLeft: '4px solid #336699' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Peso Total</div>
              <div className="text-4xl" style={{ color: '#002B6B' }}>{totalWeight.toFixed(0)}<span className="text-xl text-gray-500">kg</span></div>
            </div>
          </div>
        </Card>

        <Card className="p-6" style={{ borderLeft: '4px solid #336699' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Média de Peso</div>
              <div className="text-4xl" style={{ color: '#002B6B' }}>{avgWeight.toFixed(0)}<span className="text-xl text-gray-500">kg</span></div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Camera & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera Feed */}
          <Card className="p-6">
            <h2 className="mb-4">Visualização da Câmera</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Feed da Câmera</span>
              </div>
              
              {/* Counting Line */}
              <div 
                className="absolute left-0 right-0 h-1 shadow-lg transition-all"
                style={{ top: `${linePosition}%`, backgroundColor: '#336699' }}
              >
                <div className="absolute inset-0 blur-sm" style={{ backgroundColor: '#336699' }}></div>
              </div>

              {/* Crossing Feedback */}
              {crossingDirection && (
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300`}
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
          </Card>

          {/* Control Panel */}
          <Card className="p-6">
            <h2 className="mb-4">Painel de Controle</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => addCount(1)}
                size="lg"
                className="h-20 text-lg text-white hover:opacity-90"
                style={{ backgroundColor: '#336699' }}
              >
                <Plus className="w-6 h-6 mr-2" />
                Adicionar
              </Button>
              <Button
                onClick={() => addCount(-1)}
                variant="outline"
                size="lg"
                className="h-20 text-lg"
                disabled={count === 0}
              >
                <Minus className="w-6 h-6 mr-2" />
                Remover
              </Button>
              <Button
                onClick={addPartial}
                disabled={count === 0}
                size="lg"
                className="h-20 text-lg text-white hover:opacity-90"
                style={{ backgroundColor: '#336699' }}
              >
                <Package className="w-6 h-6 mr-2" />
                Adicionar Parcial
              </Button>
              <Button
                onClick={undoLastCount}
                variant="outline"
                size="lg"
                className="h-20 text-lg"
                disabled={count === 0}
              >
                <Undo2 className="w-6 h-6 mr-2" />
                Desfazer
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Partials */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4">Parciais Registradas</h2>

            {partials.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="mb-2">Nenhuma parcial</p>
                <p className="text-sm">Adicione parciais para acompanhar</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[600px] overflow-auto mb-4">
                  {partials.map((partial, index) => (
                    <div 
                      key={partial.id}
                      className="p-4 rounded-lg border-2 hover:border-gray-300 transition-all"
                      style={{ borderColor: index === 0 ? '#336699' : '#e5e7eb' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">
                          {partial.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        <Button
                          onClick={() => removePartial(partial.id)}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl" style={{ color: '#002B6B' }}>{partial.count}</div>
                          <div className="text-xs text-gray-500">Contagem</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl" style={{ color: '#336699' }}>{partial.weight.toFixed(1)}<span className="text-sm">kg</span></div>
                          <div className="text-xs text-gray-500">Peso</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={finishCount}
                  className="w-full text-white hover:opacity-90"
                  size="lg"
                  style={{ backgroundColor: '#336699' }}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Finalizar Contagem
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Contagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a finalizar a contagem com <strong>{partials.length} parciais</strong> e 
              contagem total de <strong>{count}</strong>. Esta ação não pode ser desfeita.
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
