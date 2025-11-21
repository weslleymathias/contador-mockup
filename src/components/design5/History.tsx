import { useState } from 'react';
import { Download, Search, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

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

  const records: CountRecord[] = [
    { id: 1, date: '2025-11-04', total: 6, totalWeight: 100, avgWeight: 16.67, operator: 'admin' },
    { id: 2, date: '2025-11-03', total: 12, totalWeight: 195, avgWeight: 16.25, operator: 'admin' },
    { id: 3, date: '2025-11-02', total: 8, totalWeight: 132, avgWeight: 16.5, operator: 'operador1' },
    { id: 4, date: '2025-11-01', total: 15, totalWeight: 245, avgWeight: 16.33, operator: 'admin' },
    { id: 5, date: '2025-10-31', total: 10, totalWeight: 168, avgWeight: 16.8, operator: 'operador2' },
  ];

  const filteredRecords = records.filter(record => 
    record.date.includes(searchTerm) || 
    record.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Design 5: Clean Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1" style={{ color: '#002B6B' }}>Histórico</h2>
          <p className="text-sm text-gray-600">Registros de contagens anteriores</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Summary Bar */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-1" style={{ color: '#002B6B' }}>{records.length}</div>
            <div className="text-sm text-gray-600">Registros</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-1" style={{ color: '#002B6B' }}>{records.reduce((sum, r) => sum + r.total, 0)}</div>
            <div className="text-sm text-gray-600">Total Contado</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-1" style={{ color: '#002B6B' }}>{records.reduce((sum, r) => sum + r.totalWeight, 0)}</div>
            <div className="text-sm text-gray-600">Peso Total (kg)</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-1" style={{ color: '#002B6B' }}>
              {(records.reduce((sum, r) => sum + r.avgWeight, 0) / records.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Média (kg)</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* ID Badge */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl text-white" style={{ backgroundColor: '#336699' }}>
                  {record.id}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-5 gap-8">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Data</div>
                    <div className="text-sm">
                      {new Date(record.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Total</div>
                    <div className="text-xl" style={{ color: '#002B6B' }}>{record.total}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Peso Total</div>
                    <div className="text-xl" style={{ color: '#002B6B' }}>{record.totalWeight}kg</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Peso Médio</div>
                    <div className="text-xl" style={{ color: '#002B6B' }}>{record.avgWeight.toFixed(2)}kg</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Operador</div>
                    <Badge variant="secondary">{record.operator}</Badge>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
