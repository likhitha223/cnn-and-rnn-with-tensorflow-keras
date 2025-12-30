
import React, { useState } from 'react';

interface Props {
  code: string;
  explanation: string;
}

const CodeDisplay: React.FC<Props> = ({ code, explanation }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-800 px-6 py-3 flex justify-between items-center border-b border-slate-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="text-xs text-slate-400 font-mono">model_implementation.py</div>
          <button 
            onClick={copyToClipboard}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium px-3 py-1 rounded bg-blue-900/20 border border-blue-500/30 transition-all"
          >
            {copySuccess ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono text-blue-100 bg-[#0d1117]">
          <code>{code}</code>
        </pre>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs">i</span>
          Implementation Strategy
        </h3>
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
          {explanation.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
