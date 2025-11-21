import { useState } from 'react';
import { Plus, Minus, AlertCircle, Undo2, Check, X } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Camera Feed */}
        <Card className="p-4">
          <h2 className="mb-3">Visualização da Câmera</h2>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Feed da Câmera</span>
            </div>
            
            <div 
              className="absolute left-0 right-0 h-1 shadow-lg transition-all"
              style={{ top: `${linePosition}%`, backgroundColor: '#336699' }}
            >
              <div className="absolute inset-0 blur-sm" style={{ backgroundColor: '#336699' }}></div>
            </div>

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

          <div className="mt-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 text-center border-2" style={{ borderColor: '#336699' }}>
            <div className="text-gray-600 mb-2">Contagem Total</div>
            <div className="text-7xl tabular-nums tracking-tight" style={{ color: '#002B6B' }}>{count}</div>
            
            <div className="flex gap-3 mt-4 justify-center">
              <Button
                onClick={() => addCount(-1)}
                variant="outline"
                size="lg"
                disabled={count === 0}
                className="flex-1 max-w-[140px]"
              >
                <Minus className="w-5 h-5 mr-2" />
                Remover
              </Button>
              <Button
                onClick={() => addCount(1)}
                size="lg"
                className="flex-1 max-w-[140px] text-white hover:opacity-90"
                style={{ backgroundColor: '#336699' }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar
              </Button>
            </div>
            
            <Button
              onClick={undoLastCount}
              variant="ghost"
              size="sm"
              disabled={count === 0}
              className="mt-3"
            >
              <Undo2 className="w-4 h-4 mr-2" />
              Desfazer
            </Button>
          </div>
        </Card>

        {/* Partials */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2>Parciais</h2>
            <Button onClick={addPartial} disabled={count === 0} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Parcial
            </Button>
          </div>

          {partials.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="mb-2">Nenhuma parcial registrada</p>
              <p className="text-sm">Adicione parciais durante a contagem</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-3 border" style={{ borderColor: '#336699' }}>
                  <div className="text-xs text-gray-600">Parciais</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{partials.length}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border" style={{ borderColor: '#336699' }}>
                  <div className="text-xs text-gray-600">Peso Total</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{totalWeight.toFixed(1)} kg</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border" style={{ borderColor: '#336699' }}>
                  <div className="text-xs text-gray-600">Peso Médio</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{avgWeight.toFixed(1)} kg</div>
                </div>
              </div>

              <div className="overflow-auto max-h-[400px] border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Contagem</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Peso (kg)</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Horário</th>
                      <th className="px-4 py-3 text-right text-xs text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partials.map((partial, index) => (
                      <tr 
                        key={partial.id}
                        className={`border-t hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="px-4 py-3">{partial.count}</td>
                        <td className="px-4 py-3">{partial.weight.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {partial.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            onClick={() => removePartial(partial.id)}
                            variant="ghost"
                            size="sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button 
                onClick={finishCount}
                className="w-full mt-4 text-white hover:opacity-90"
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
