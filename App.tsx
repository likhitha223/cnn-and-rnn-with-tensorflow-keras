
import React, { useState, useEffect } from 'react';
import { ModelType, LayerConfig, TrainingStats } from './types';
import { generateModelSolution } from './services/geminiService';
import VisualizerCNN from './components/VisualizerCNN';
import VisualizerRNN from './components/VisualizerRNN';
import TrainingChart from './components/TrainingChart';
import CodeDisplay from './components/CodeDisplay';

// Fixed kernel and pool parameters to use arrays instead of comma-separated parentheses
const DEFAULT_CNN_LAYERS: LayerConfig[] = [
  { id: '1', type: 'Conv2D', params: { filters: 32, kernel: [3, 3], activation: 'relu' } },
  { id: '2', type: 'MaxPooling2D', params: { pool: [2, 2] } },
  { id: '3', type: 'Flatten', params: {} },
  { id: '4', type: 'Dense', params: { units: 10, activation: 'softmax' } },
];

const DEFAULT_RNN_LAYERS: LayerConfig[] = [
  { id: '1', type: 'Embedding', params: { input_dim: 10000, output_dim: 128 } },
  { id: '2', type: 'LSTM', params: { units: 64, return_sequences: false } },
  { id: '3', type: 'Dense', params: { units: 1, activation: 'sigmoid' } },
];

function App() {
  const [modelType, setModelType] = useState<ModelType>(ModelType.CNN);
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<{ code: string; explanation: string } | null>(null);
  const [stats, setStats] = useState<TrainingStats[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const layers = modelType === ModelType.CNN ? DEFAULT_CNN_LAYERS : DEFAULT_RNN_LAYERS;
      const task = modelType === ModelType.CNN ? "Image classification on MNIST" : "Sentiment analysis on IMDB dataset";
      const result = await generateModelSolution(modelType, layers, task);
      setSolution(result);
      
      // Generate some dummy training stats
      const newStats: TrainingStats[] = Array.from({ length: 20 }, (_, i) => ({
        epoch: i + 1,
        accuracy: 0.5 + (0.4 * (i / 19)) + (Math.random() * 0.05),
        valAccuracy: 0.5 + (0.35 * (i / 19)) + (Math.random() * 0.05),
        loss: 1.0 - (0.8 * (i / 19)),
        valLoss: 1.1 - (0.7 * (i / 19)),
      }));
      setStats(newStats);
    } catch (error) {
      console.error("Failed to generate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              NeuroStudio
            </h1>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">TensorFlow & Keras Architect</p>
          </div>
        </div>

        <nav className="hidden md:flex bg-slate-900 rounded-full p-1 border border-slate-800">
          <button 
            onClick={() => setModelType(ModelType.CNN)}
            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${modelType === ModelType.CNN ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            CNN (Convolutional)
          </button>
          <button 
            onClick={() => setModelType(ModelType.RNN)}
            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${modelType === ModelType.RNN ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            RNN (Recurrent)
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 bg-white text-slate-950 rounded-full font-bold text-sm hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                Compiling...
              </>
            ) : 'Generate Solution'}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visualizers & Charts */}
        <div className="lg:col-span-5 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white px-2">Live Laboratory</h2>
            {modelType === ModelType.CNN ? <VisualizerCNN /> : <VisualizerRNN />}
          </section>

          {stats.length > 0 && (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
               <h2 className="text-xl font-bold text-slate-400 px-2">Training Real-time</h2>
               <TrainingChart data={stats} />
            </section>
          )}

          <section className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
             <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Architecture Brief</h3>
             <div className="space-y-3">
                {(modelType === ModelType.CNN ? DEFAULT_CNN_LAYERS : DEFAULT_RNN_LAYERS).map((layer, idx) => (
                  <div key={layer.id} className="flex items-center gap-4 group">
                     <span className="text-xs font-mono text-slate-600">0{idx+1}</span>
                     <div className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between group-hover:border-slate-600 transition-colors">
                        <span className="text-sm font-bold text-slate-300">{layer.type}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{Object.keys(layer.params).length} params</span>
                     </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Right Column: Code & Docs */}
        <div className="lg:col-span-7">
          {solution ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
               <CodeDisplay code={solution.code} explanation={solution.explanation} />
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-slate-800">
                 <svg className="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">Ready for Implementation</h3>
              <p className="text-slate-500 max-w-md">
                Configure your model type and click "Generate Solution" to get an end-to-end Keras implementation including data loading, training loops, and evaluation scripts.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 py-8 px-6 text-center">
        <p className="text-slate-600 text-sm">
          Built with Gemini Intelligence for TensorFlow/Keras development.
        </p>
      </footer>
    </div>
  );
}

export default App;
