import { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type CountRecord = {
  id: number;
  date: string;
  total: number;
  totalWeight: number;
  operator: string;
};

export function History() {
  const [searchTerm, setSearchTerm] = useState('');

  const records: CountRecord[] = [
    { id: 1, date: '2025-11-04', total: 6, totalWeight: 100, operator: 'Luciano' },
    { id: 2, date: '2025-11-03', total: 12, totalWeight: 195, operator: 'Luciano' },
    { id: 3, date: '2025-11-02', total: 8, totalWeight: 132, operator: 'chapolin' },
    { id: 4, date: '2025-11-01', total: 15, totalWeight: 245, operator: 'Luciano' },
    { id: 5, date: '2025-10-31', total: 10, totalWeight: 168, operator: 'chapolin' },
  ];

  const filteredRecords = records.filter(record => 
    record.date.includes(searchTerm) || 
    record.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">
                  ID: <strong>{record.id}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(record.date).toLocaleDateString('pt-BR')}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-gray-600">Total</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{record.total}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Peso (kg)</div>
                  <div className="text-2xl" style={{ color: '#002B6B' }}>{record.totalWeight}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Operador</div>
                  <div className="text-sm mt-1">{record.operator}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Exportar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
