import { useState } from 'react';
import AppOriginal from './App-original';
import AppDesign1 from './App-design1';
import AppDesign2 from './App-design2';
import AppDesign5 from './App-design5';
import { Palette } from 'lucide-react';
import { Button } from './components/ui/button';

type DesignVersion = 'original' | 1 | 2 | 5;

export default function App() {
  const [currentDesign, setCurrentDesign] = useState<DesignVersion>('original');
  const [showSelector, setShowSelector] = useState(true);

  const designs = [
    { id: 'original' as DesignVersion, name: 'Layout Original', description: 'Menu Principal com Cards' },
    { id: 1 as DesignVersion, name: 'Design 1', description: 'Menu Superior Horizontal' },
    { id: 2 as DesignVersion, name: 'Design 2', description: 'Sidebar com Header' },
    { id: 5 as DesignVersion, name: 'Design 3', description: 'Sidebar Expansível' },
  ];

  return (
    <div className="relative">
      {/* Design Selector Button - Fixed */}
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        style={{ backgroundColor: '#336699' }}
        title="Alternar Designs"
      >
        <Palette className="w-6 h-6" />
      </button>

      {/* Design Selector Panel */}
      {showSelector && (
        <div 
          className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl p-4 w-80 border-2"
          style={{ borderColor: '#336699' }}
        >
          <div className="mb-3">
            <h3 className="text-lg mb-1" style={{ color: '#002B6B' }}>Selecione o Layout</h3>
            <p className="text-xs text-gray-600">Escolha entre os 4 designs disponíveis</p>
          </div>
          
          <div className="space-y-2">
            {designs.map((design) => (
              <button
                key={design.id}
                onClick={() => setCurrentDesign(design.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  currentDesign === design.id
                    ? 'text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={
                  currentDesign === design.id
                    ? { backgroundColor: '#336699', borderColor: '#336699' }
                    : undefined
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold mb-0.5 ${
                      currentDesign === design.id ? 'text-white' : ''
                    }`} style={currentDesign !== design.id ? { color: '#002B6B' } : undefined}>
                      {design.name}
                    </div>
                    <div className={`text-xs ${
                      currentDesign === design.id ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {design.description}
                    </div>
                  </div>
                  {currentDesign === design.id && (
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#336699' }}></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              onClick={() => setShowSelector(false)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Render Selected Design */}
      {currentDesign === 'original' && <AppOriginal />}
      {currentDesign === 1 && <AppDesign1 />}
      {currentDesign === 2 && <AppDesign2 />}
      {currentDesign === 5 && <AppDesign5 />}
    </div>
  );
}