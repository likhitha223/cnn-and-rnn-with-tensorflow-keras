
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrainingStats } from '../types';

interface Props {
  data: TrainingStats[];
}

const TrainingChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-64 w-full bg-slate-900/50 p-4 rounded-xl border border-slate-800">
      <h3 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider">Training Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="epoch" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="Accuracy" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="valAccuracy" stroke="#10b981" name="Val Accuracy" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingChart;
