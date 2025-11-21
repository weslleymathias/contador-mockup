import { useState } from 'react';
import { Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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
  partial: number;
  count: number;
  weight: number;
  lot: string;
};

export function Home() {
  const [count, setCount] = useState(0);
  const [partials, setPartials] = useState<Partial[]>([]);
  const [lot, setLot] = useState('');
  const [showFinishDialog, setShowFinishDialog] = useState(false);

  const addPartial = () => {
    if (count === 0) {
      toast.error('A contagem está em 0');
      return;
    }
    
    const newPartial: Partial = {
      id: Date.now().toString(),
      partial: partials.length + 1,
      count: count,
      weight: Math.round((Math.random() * 50 + 50) * 100) / 100,
      lot: lot || '-',
    };
    setPartials([...partials, newPartial]);
    toast.success('Parcial adicionada!');
  };

  const handleZero = () => {
    setCount(0);
    toast.info('Contador zerado');
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
    setLot('');
    setShowFinishDialog(false);
  };

  const totalCount = partials.reduce((sum, p) => sum + p.count, 0);
  const totalWeight = partials.reduce((sum, p) => sum + p.weight, 0);
  const avgWeight = partials.length > 0 ? totalWeight / partials.length : 0;

  return (
    <div className="px-4 pb-4">
      {/* Camera Feed */}
      <div className="mb-4 border-2 rounded-lg overflow-hidden" style={{ borderColor: '#002B6B' }}>
        <div className="relative bg-gray-800 aspect-video">
          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Feed da Câmera</span>
          </div>
          {/* Linha divisória vertical */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 left-1/2 -translate-x-1/2"
            style={{ backgroundColor: '#336699' }}
          >
            <div className="absolute inset-0 blur-sm" style={{ backgroundColor: '#336699' }}></div>
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="text-center mb-4">
        <div className="text-8xl tabular-nums" style={{ color: '#002B6B' }}>{count}</div>
      </div>

      {/* Add Partial Button */}
      <Button 
        onClick={addPartial}
        className="w-full mb-4 text-white"
        style={{ backgroundColor: '#002B6B' }}
        size="lg"
      >
        Adicionar Parcial
      </Button>

      {/* Lot and Zero */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Lote"
          value={lot}
          onChange={(e) => setLot(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleZero}
          variant="outline"
          style={{ borderColor: '#002B6B', color: '#002B6B' }}
        >
          Zerar
        </Button>
      </div>

      {/* Parciais Section */}
      <div className="mb-4">
        <h3 className="mb-2 text-center">Parciais</h3>
        
        {partials.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 text-left text-xs">Parcial</th>
                  <th className="px-2 py-2 text-left text-xs">Contagem</th>
                  <th className="px-2 py-2 text-left text-xs">Peso (kg)</th>
                  <th className="px-2 py-2 text-left text-xs">Lote</th>
                  <th className="px-2 py-2 text-left text-xs">Ação</th>
                </tr>
              </thead>
              <tbody>
                {partials.map((partial) => (
                  <tr key={partial.id} className="border-t">
                    <td className="px-2 py-2">{partial.partial}</td>
                    <td className="px-2 py-2">{partial.count}</td>
                    <td className="px-2 py-2">{partial.weight.toFixed(2)}</td>
                    <td className="px-2 py-2">{partial.lot}</td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => removePartial(partial.id)}
                        className="text-red-600 text-xs"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border rounded-lg p-4 text-center text-gray-500 text-sm">
            Nenhuma parcial registrada
          </div>
        )}
      </div>

      {/* Totals Section */}
      <div className="mb-4 border rounded-lg p-4 bg-gray-50">
        <h3 className="text-center mb-3">Totais</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-600 mb-1">Contagem Total (kg)</div>
            <div className="text-2xl" style={{ color: '#002B6B' }}>{totalCount}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Peso Total (kg)</div>
            <div className="text-2xl" style={{ color: '#002B6B' }}>{totalWeight.toFixed(0)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Peso médio (kg)</div>
            <div className="text-2xl" style={{ color: '#002B6B' }}>{avgWeight.toFixed(0)}</div>
          </div>
        </div>
        
        {/* Print Icon */}
        <div className="flex justify-center mt-4">
          <button className="p-3 border-2 rounded-lg" style={{ borderColor: '#002B6B' }}>
            <Printer className="w-6 h-6" style={{ color: '#002B6B' }} />
          </button>
        </div>
      </div>

      {/* Finish Button */}
      <Button 
        onClick={finishCount}
        className="w-full text-white"
        style={{ backgroundColor: '#002B6B' }}
        size="lg"
      >
        Finalizar Contagem
      </Button>

      <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Contagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a finalizar a contagem com <strong>{partials.length} parciais</strong> e 
              contagem total de <strong>{totalCount}</strong>. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFinish} className="text-white" style={{ backgroundColor: '#002B6B' }}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
