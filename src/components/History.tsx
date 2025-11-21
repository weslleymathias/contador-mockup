import { useState } from 'react';
import { Edit2, Trash2, Download, Search, Filter, FileText, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import logo from 'figma:asset/5f316cdefa96397254c8edcbdb44ccf364a5336d.png';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
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

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  const handleExport = () => {
    // Implementar exportação
    console.log('Exportar dados');
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Piggia" className="h-16 w-16 rounded-full" />
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#336699' }}>
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Bem-vindo,</div>
              <div className="text-xl">
                <strong>admin</strong>!
              </div>
            </div>
          </div>
          
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-slate-50 border" style={{ borderColor: '#336699' }}>
          <div className="text-sm text-gray-600 mb-1">Total de Contagens</div>
          <div className="text-3xl" style={{ color: '#002B6B' }}>{records.length}</div>
        </Card>
        <Card className="p-4 bg-slate-50 border" style={{ borderColor: '#336699' }}>
          <div className="text-sm text-gray-600 mb-1">Animais Contados</div>
          <div className="text-3xl" style={{ color: '#002B6B' }}>{records.reduce((sum, r) => sum + r.total, 0)}</div>
        </Card>
        <Card className="p-4 bg-slate-50 border" style={{ borderColor: '#336699' }}>
          <div className="text-sm text-gray-600 mb-1">Peso Total</div>
          <div className="text-3xl" style={{ color: '#002B6B' }}>{records.reduce((sum, r) => sum + r.totalWeight, 0)} kg</div>
        </Card>
        <Card className="p-4 bg-slate-50 border" style={{ borderColor: '#336699' }}>
          <div className="text-sm text-gray-600 mb-1">Média Geral</div>
          <div className="text-3xl" style={{ color: '#002B6B' }}>
            {(records.reduce((sum, r) => sum + r.avgWeight, 0) / records.length).toFixed(1)} kg
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por data ou operador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        {currentRecords.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="mb-2">Nenhum registro encontrado</p>
            <p className="text-sm">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Peso Total (kg)</th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Peso Médio (kg)</th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Operador</th>
                    <th className="px-6 py-4 text-right text-xs text-gray-600 uppercase tracking-wider">Ação</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecords.map((record, index) => (
                    <tr 
                      key={record.id} 
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <Badge variant="outline">{record.id}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(record.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white" style={{ backgroundColor: '#336699' }}>
                          {record.total}
                        </span>
                      </td>
                      <td className="px-6 py-4">{record.totalWeight.toFixed(1)}</td>
                      <td className="px-6 py-4">{record.avgWeight.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{record.operator}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredRecords.length)} de {filteredRecords.length} registros
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}