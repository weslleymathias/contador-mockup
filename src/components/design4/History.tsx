import { useState } from 'react';
import { Edit2, Trash2, Download, Search, Calendar, User, TrendingUp, Weight, BarChart3 } from 'lucide-react';
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
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Design 4: Header com Info do Usuário */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl mb-2" style={{ color: '#002B6B' }}>Histórico de Contagens</h1>
          <p className="text-gray-600">Visualize e gerencie registros anteriores</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#336699' }}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Operador</div>
              <div className="font-semibold">admin</div>
            </div>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10" style={{ backgroundColor: '#336699' }}></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4" style={{ color: '#336699' }} />
              <div className="text-sm text-gray-600">Total de Registros</div>
            </div>
            <div className="text-3xl" style={{ color: '#002B6B' }}>{records.length}</div>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10" style={{ backgroundColor: '#336699' }}></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" style={{ color: '#336699' }} />
              <div className="text-sm text-gray-600">Total Contado</div>
            </div>
            <div className="text-3xl" style={{ color: '#002B6B' }}>{records.reduce((sum, r) => sum + r.total, 0)}</div>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10" style={{ backgroundColor: '#336699' }}></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Weight className="w-4 h-4" style={{ color: '#336699' }} />
              <div className="text-sm text-gray-600">Peso Total</div>
            </div>
            <div className="text-3xl" style={{ color: '#002B6B' }}>{records.reduce((sum, r) => sum + r.totalWeight, 0)}<span className="text-lg text-gray-500">kg</span></div>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10" style={{ backgroundColor: '#336699' }}></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" style={{ color: '#336699' }} />
              <div className="text-sm text-gray-600">Média Geral</div>
            </div>
            <div className="text-3xl" style={{ color: '#002B6B' }}>
              {(records.reduce((sum, r) => sum + r.avgWeight, 0) / records.length).toFixed(1)}<span className="text-lg text-gray-500">kg</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por data ou operador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl" style={{ backgroundColor: '#336699' }}>
                  {record.id}
                </div>
                
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Data</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>
                        {new Date(record.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total</div>
                    <div className="text-2xl" style={{ color: '#002B6B' }}>{record.total}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Peso Total</div>
                    <div className="text-2xl" style={{ color: '#002B6B' }}>{record.totalWeight}<span className="text-sm text-gray-500">kg</span></div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Peso Médio</div>
                    <div className="text-2xl" style={{ color: '#002B6B' }}>{record.avgWeight.toFixed(2)}<span className="text-sm text-gray-500">kg</span></div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Operador</div>
                    <Badge variant="secondary">{record.operator}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
