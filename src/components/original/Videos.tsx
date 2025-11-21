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
  const itemsPerPage = 6;

  // Mock data - simulando gravações
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
    <div className="px-4 pb-4">
      <h2 className="text-xl mb-4 text-center">Gravações de Vídeo</h2>

      {/* Info Box */}
      <div className="bg-gray-50 border rounded-lg p-3 mb-4" style={{ borderColor: '#336699' }}>
        <p className="text-xs text-gray-700 text-center">
          Total de <strong>{allVideos.length} gravações</strong> • Página {currentPage} de {totalPages}
        </p>
      </div>

      {/* Videos Grid */}
      <div className="space-y-3 mb-4">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white border-2 rounded-lg overflow-hidden"
            style={{ borderColor: '#002B6B' }}
          >
            {/* Thumbnail */}
            <div className="relative bg-gray-800 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-900"></div>
              <Play className="w-12 h-12 text-white opacity-70 relative z-10" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span>{video.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{video.time}</span>
                    <span className="mx-2">•</span>
                    <span>{video.size}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  ID: {video.id}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => handlePlay(video.id)}
                  size="sm"
                  className="text-white"
                  style={{ backgroundColor: '#336699' }}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Play
                </Button>
                <Button
                  onClick={() => handleDownload(video.id)}
                  size="sm"
                  variant="outline"
                  style={{ borderColor: '#002B6B', color: '#002B6B' }}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Baixar
                </Button>
                <Button
                  onClick={() => setVideoToDelete(video.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          style={{ borderColor: '#002B6B', color: '#002B6B' }}
        >
          <ChevronLeft className="w-4 h-4" />
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
                    : { borderColor: '#002B6B', color: '#002B6B' }
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
          style={{ borderColor: '#002B6B', color: '#002B6B' }}
        >
          <ChevronRight className="w-4 h-4" />
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
