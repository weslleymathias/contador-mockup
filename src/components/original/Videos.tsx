import { useState } from 'react';
import { Play, Download, FolderOpen, Folder, ChevronDown, ChevronRight, FileVideo, Calendar as CalendarIcon, X } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Video = {
  id: number;
  name: string;
  size: string;
  duration: string;
};

type HourFolder = {
  hour: string;
  videos: Video[];
};

type DateFolder = {
  date: string;
  hours: HourFolder[];
};

// Função para gerar dados mock organizados
function generateMockData(): DateFolder[] {
  const dates = ['2025-12-23', '2025-12-22', '2025-12-21', '2025-12-20', '2025-12-19'];
  const hours = ['16h', '15h', '14h', '13h', '12h', '11h', '10h', '09h'];
  
  return dates.map(date => ({
    date,
    hours: hours.slice(0, Math.floor(Math.random() * 4) + 3).map(hour => ({
      hour,
      videos: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => ({
        id: Math.floor(Math.random() * 10000),
        name: `video_${date}_${hour.replace('h', '')}_${String(i + 1).padStart(3, '0')}.mp4`,
        size: `${(Math.random() * 500 + 100).toFixed(1)} MB`,
        duration: `${Math.floor(Math.random() * 5) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
      }))
    }))
  }));
}

export function Videos() {
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [expandedHours, setExpandedHours] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const videoData = generateMockData();

  // Função para formatar data no formato YYYY-MM-DD
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filtrar dados baseado na data selecionada
  const filteredVideoData = selectedDate 
    ? videoData.filter(folder => folder.date === formatDateToString(selectedDate))
    : videoData;

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    if (date) {
      // Auto-expande a pasta da data selecionada
      setExpandedDates(new Set([formatDateToString(date)]));
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setIsCalendarOpen(false);
    // Auto-expande a pasta de hoje
    setExpandedDates(new Set([formatDateToString(today)]));
  };

  const handleClearFilter = () => {
    setSelectedDate(undefined);
    setExpandedDates(new Set());
    setExpandedHours(new Set());
  };

  const toggleDate = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
      // Também fecha todas as horas dessa data
      const hoursToRemove = Array.from(expandedHours).filter(h => h.startsWith(date));
      hoursToRemove.forEach(h => expandedHours.delete(h));
      setExpandedHours(new Set(expandedHours));
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  const toggleHour = (date: string, hour: string) => {
    const key = `${date}-${hour}`;
    const newExpanded = new Set(expandedHours);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedHours(newExpanded);
  };

  const handleDownloadDateZip = (date: string) => {
    toast.success(`Download do arquivo zip de ${date} iniciado`);
  };

  const handleDownloadHourZip = (date: string, hour: string) => {
    toast.success(`Download do arquivo zip de ${date} às ${hour} iniciado`);
  };

  const handleDownloadVideo = (videoName: string) => {
    toast.success(`Download de ${videoName} iniciado`);
  };

  const getTotalVideos = () => {
    return filteredVideoData.reduce((total, dateFolder) => 
      total + dateFolder.hours.reduce((sum, hourFolder) => sum + hourFolder.videos.length, 0)
    , 0);
  };

  return (
    <div className="px-4 pb-4">
      <h2 className="text-xl mb-4 text-center">Gravações de Vídeo</h2>

      {/* Filtro de Data */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-sm"
                style={{ borderColor: '#002B6B', color: '#002B6B' }}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {selectedDate ? formatDateToString(selectedDate) : 'Selecionar data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleTodayClick}
            variant="outline"
            size="sm"
            className="text-sm"
            style={{ borderColor: '#336699', color: '#336699' }}
          >
            Hoje
          </Button>

          {selectedDate && (
            <Button
              onClick={handleClearFilter}
              variant="outline"
              size="sm"
              className="text-sm"
              style={{ borderColor: '#666', color: '#666' }}
            >
              <X className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>

        {selectedDate && (
          <div className="text-center text-sm text-gray-600">
            Exibindo vídeos de: <strong>{formatDateToString(selectedDate)}</strong>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-gray-50 border rounded-lg p-3 mb-4" style={{ borderColor: '#336699' }}>
        <p className="text-xs text-gray-700 text-center">
          Total de <strong>{getTotalVideos()} vídeos</strong> organizados em <strong>{filteredVideoData.length} {filteredVideoData.length === 1 ? 'data' : 'datas'}</strong>
        </p>
      </div>

      {/* Hierarchical Video Structure */}
      <div className="space-y-2">
        {filteredVideoData.map((dateFolder) => {
          const isDateExpanded = expandedDates.has(dateFolder.date);
          const totalVideosInDate = dateFolder.hours.reduce((sum, h) => sum + h.videos.length, 0);
          
          return (
            <div key={dateFolder.date} className="bg-white border-2 rounded-lg overflow-hidden" style={{ borderColor: '#002B6B' }}>
              {/* Date Folder Header */}
              <div className="p-3" style={{ backgroundColor: '#f8fafc' }}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleDate(dateFolder.date)}
                    className="flex items-center gap-2 flex-1 text-left hover:opacity-70 transition-opacity"
                  >
                    {isDateExpanded ? (
                      <ChevronDown className="w-5 h-5" style={{ color: '#002B6B' }} />
                    ) : (
                      <ChevronRight className="w-5 h-5" style={{ color: '#002B6B' }} />
                    )}
                    {isDateExpanded ? (
                      <FolderOpen className="w-5 h-5" style={{ color: '#336699' }} />
                    ) : (
                      <Folder className="w-5 h-5" style={{ color: '#336699' }} />
                    )}
                    <span className="font-medium" style={{ color: '#002B6B' }}>
                      {dateFolder.date}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({totalVideosInDate} {totalVideosInDate === 1 ? 'vídeo' : 'vídeos'})
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleDownloadDateZip(dateFolder.date)}
                    className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity px-3 py-1 rounded"
                    style={{ color: '#336699' }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar zip</span>
                  </button>
                </div>
              </div>

              {/* Hours within Date */}
              {isDateExpanded && (
                <div className="border-t" style={{ borderColor: '#e2e8f0' }}>
                  {dateFolder.hours.map((hourFolder) => {
                    const hourKey = `${dateFolder.date}-${hourFolder.hour}`;
                    const isHourExpanded = expandedHours.has(hourKey);
                    
                    return (
                      <div key={hourKey} className="border-b last:border-b-0" style={{ borderColor: '#e2e8f0' }}>
                        {/* Hour Folder Header */}
                        <div className="p-3 pl-8" style={{ backgroundColor: '#fafbfc' }}>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => toggleHour(dateFolder.date, hourFolder.hour)}
                              className="flex items-center gap-2 flex-1 text-left hover:opacity-70 transition-opacity"
                            >
                              {isHourExpanded ? (
                                <ChevronDown className="w-4 h-4" style={{ color: '#002B6B' }} />
                              ) : (
                                <ChevronRight className="w-4 h-4" style={{ color: '#002B6B' }} />
                              )}
                              {isHourExpanded ? (
                                <FolderOpen className="w-4 h-4" style={{ color: '#336699' }} />
                              ) : (
                                <Folder className="w-4 h-4" style={{ color: '#336699' }} />
                              )}
                              <span className="text-sm font-medium" style={{ color: '#002B6B' }}>
                                {hourFolder.hour}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({hourFolder.videos.length} {hourFolder.videos.length === 1 ? 'vídeo' : 'vídeos'})
                              </span>
                            </button>
                            
                            <button
                              onClick={() => handleDownloadHourZip(dateFolder.date, hourFolder.hour)}
                              className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity px-3 py-1 rounded"
                              style={{ color: '#336699' }}
                            >
                              <Download className="w-4 h-4" />
                              <span>Baixar zip</span>
                            </button>
                          </div>
                        </div>

                        {/* Videos within Hour */}
                        {isHourExpanded && (
                          <div className="bg-white">
                            {hourFolder.videos.map((video) => (
                              <div
                                key={video.id}
                                className="flex items-center justify-between p-3 pl-14 border-t hover:bg-gray-50 transition-colors"
                                style={{ borderColor: '#f1f5f9' }}
                              >
                                <div className="flex items-center gap-2 flex-1">
                                  <FileVideo className="w-4 h-4 text-gray-600" />
                                  <div>
                                    <div className="text-sm" style={{ color: '#002B6B' }}>
                                      {video.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {video.size} • {video.duration}
                                    </div>
                                  </div>
                                </div>
                                
                                <button
                                  onClick={() => handleDownloadVideo(video.name)}
                                  className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity px-3 py-1 rounded whitespace-nowrap"
                                  style={{ color: '#336699' }}
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Baixar vídeo</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Estado vazio */}
      {filteredVideoData.length === 0 && selectedDate && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Pasta vazia</p>
        </div>
      )}

      {filteredVideoData.length === 0 && !selectedDate && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Nenhuma gravação de vídeo disponível</p>
        </div>
      )}
    </div>
  );
}