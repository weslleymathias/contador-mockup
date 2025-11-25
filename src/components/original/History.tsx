import { useState } from 'react';
import { Search, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner@2.0.3';
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

type CountRecord = {
  id: number;
  date: string;
  total: number;
  totalWeight: number;
  avgWeight: number;
  operator: string;
};

export function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

  const records: CountRecord[] = [
    { id: 1, date: '2025-11-04', total: 6, totalWeight: 100, avgWeight: 16.67, operator: 'admin' },
    { id: 2, date: '2025-11-03', total: 12, totalWeight: 195, avgWeight: 16.25, operator: 'Luciano' },
    { id: 3, date: '2025-11-02', total: 8, totalWeight: 132, avgWeight: 16.5, operator: 'chapolin' },
    { id: 4, date: '2025-11-01', total: 15, totalWeight: 245, avgWeight: 16.33, operator: 'Luciano' },
    { id: 5, date: '2025-10-31', total: 10, totalWeight: 168, avgWeight: 16.8, operator: 'chapolin' },
  ];

  const filteredRecords = records.filter(record => 
    record.date.includes(searchTerm) || 
    record.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    toast.info(`Editando contagem #${id}`);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      toast.success(`Contagem #${recordToDelete} excluída`);
      setRecordToDelete(null);
    }
  };

  return (
    <div className="px-4 pb-4">
      <h2 className="text-xl mb-4 text-center">Histórico de Contagens</h2>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por data ou operador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Records */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="mb-2">Nenhum registro encontrado</p>
          <p className="text-sm">Tente ajustar a busca</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white border-2 rounded-lg p-4"
              style={{ borderColor: '#002B6B' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600">
                  ID: <strong>{record.id}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(record.date).toLocaleDateString('pt-BR')}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Total</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{record.total}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Peso Total (kg)</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{record.totalWeight}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Peso Médio (kg)</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{record.avgWeight}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Operador</div>
                  <div className="text-lg mt-1">{record.operator}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end border-t pt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(record.id)}
                  style={{ borderColor: '#336699', color: '#336699' }}
                  className="hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setRecordToDelete(record.id)}
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={recordToDelete !== null} onOpenChange={() => setRecordToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Contagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir permanentemente a contagem #{recordToDelete}. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}