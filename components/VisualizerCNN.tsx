
import React, { useRef, useState, useEffect } from 'react';

const VisualizerCNN: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.beginPath();
    
    // Simulate CNN inference
    setPrediction(Math.floor(Math.random() * 10));
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setPrediction(null);
    }
  };

  useEffect(() => {
    clear();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="text-center">
        <h3 className="text-xl font-bold text-blue-400">CNN MNIST Simulator</h3>
        <p className="text-slate-400 text-sm">Draw a digit (0-9) to see spatial feature extraction in action.</p>
      </div>
      
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="bg-black rounded-lg cursor-crosshair border-2 border-slate-700 group-hover:border-blue-500 transition-colors"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
        />
        {prediction !== null && (
          <div className="absolute -top-4 -right-4 bg-blue-600 text-white font-black text-4xl w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-slate-900 animate-bounce">
            {prediction}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={clear}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all font-medium border border-slate-700"
        >
          Clear Canvas
        </button>
        <div className="px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full font-medium border border-blue-500/30">
          Inference Mode: Active
        </div>
      </div>
      
      <div className="w-full mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Internal Representation</p>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-blue-900/20 rounded border border-blue-500/20 flex items-center justify-center overflow-hidden">
               <div className="w-full h-full opacity-30 animate-pulse bg-gradient-to-br from-blue-500 to-purple-600"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizerCNN;
