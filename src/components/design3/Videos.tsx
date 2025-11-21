import { useState } from 'react';
import { Play, Download, Trash2, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
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

type VideoRecord = {
  id: number;
  date: string;
  time: string;
  duration: string;
  size: string;
  thumbnail: string;
};

export function Videos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [videoToDelete, setVideoToDelete] = useState<number | null>(null);
  const itemsPerPage = 8;

  const allVideos: VideoRecord[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    date: new Date(2025, 10, Math.floor(Math.random() * 19) + 1).toLocaleDateString('pt-BR'),
    time: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    duration: `${Math.floor(Math.random() * 5) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    size: `${(Math.random() * 500 + 100).toFixed(1)} MB`,
    thumbnail: '#',
  }));

  const totalPages = Math.ceil(allVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = allVideos.slice(startIndex, endIndex);

  const handlePlay = (id: number) => {
    toast.info(`Reproduzindo vídeo #${id}`);
  };

  const handleDownload = (id: number) => {
    toast.success(`Download do vídeo #${id} iniciado`);
  };

  const confirmDelete = () => {
    if (videoToDelete) {
      toast.success(`Vídeo #${videoToDelete} excluído`);
      setVideoToDelete(null);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl mb-2" style={{ color: '#002B6B' }}>Gravações de Vídeo</h2>
        <p className="text-gray-600">
          Total de {allVideos.length} gravações • Página {currentPage} de {totalPages}
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border"
            style={{ borderColor: '#E5E7EB' }}
          >
            {/* Thumbnail */}
            <div className="relative bg-gray-800 aspect-video flex items-center justify-center cursor-pointer group"
              onClick={() => handlePlay(video.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-900"></div>
              <Play className="w-12 h-12 text-white opacity-70 relative z-10 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                #{video.id}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-3">
              <div className="flex items-center gap-2 text-xs mb-1">
                <Calendar className="w-3 h-3 text-gray-500" />
                <span className="text-gray-700">{video.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                <Clock className="w-3 h-3" />
                <span>{video.time}</span>
                <span>•</span>
                <span>{video.size}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload(video.id)}
                  size="sm"
                  className="flex-1 text-white text-xs h-8"
                  style={{ backgroundColor: '#336699' }}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Baixar
                </Button>
                <Button
                  onClick={() => setVideoToDelete(video.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 h-8 px-2"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                size="sm"
                className={currentPage === pageNum ? 'text-white' : ''}
                style={
                  currentPage === pageNum
                    ? { backgroundColor: '#002B6B' }
                    : {}
                }
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
        >
          Próxima
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={videoToDelete !== null} onOpenChange={() => setVideoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Gravação?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir permanentemente o vídeo #{videoToDelete}. Esta ação não pode ser desfeita.
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
