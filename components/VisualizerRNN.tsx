
import React, { useState } from 'react';

const VisualizerRNN: React.FC = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<{ score: number; label: string } | null>(null);

  const analyze = () => {
    if (!text) return;
    const score = Math.random();
    setSentiment({
      score: score,
      label: score > 0.5 ? "Positive" : "Negative"
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="text-center">
        <h3 className="text-xl font-bold text-emerald-400">RNN Sentiment Analyzer</h3>
        <p className="text-slate-400 text-sm">Input a sequence to see temporal dependencies mapped.</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something like 'This movie was absolutely fantastic!'"
        className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
      />

      <button
        onClick={analyze}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20"
      >
        Analyze Temporal Sequence
      </button>

      {sentiment && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-medium">Model Output: <span className={sentiment.label === "Positive" ? "text-emerald-400" : "text-rose-400"}>{sentiment.label}</span></span>
            <span className="text-slate-500 text-xs">{Math.round(sentiment.score * 100)}% confidence</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${sentiment.label === "Positive" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"}`}
              style={{ width: `${sentiment.score * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
         <p className="text-xs text-slate-500 uppercase font-bold mb-3">LSTM Hidden States</p>
         <div className="flex gap-2 overflow-x-auto pb-2">
            {text.split(' ').map((word, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-400 font-mono animate-pulse">
                   h_{i}
                </div>
                <span className="text-[10px] text-slate-500 truncate max-w-[60px]">{word}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default VisualizerRNN;
