
export enum ModelType {
  CNN = 'CNN',
  RNN = 'RNN'
}

export interface LayerConfig {
  id: string;
  type: string;
  params: Record<string, any>;
}

export interface TrainingStats {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss: number;
  valAccuracy: number;
}

export interface ModelOutput {
  code: string;
  explanation: string;
  architectureDiagram?: string;
}
