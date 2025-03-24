export interface Scale {
  id: string;
  name: string;
  description: string;
  instructions: string;
  scoring: {
    method: string;
    ranges: Array<{
      min: number;
      max: number;
      interpretation: string;
    }>;
  };
  references: Array<{
    title: string;
    authors: string[];
    year: number;
    doi?: string;
  }>;
  categories: string[];
  specialty: string;
  bodySystem: string;
  lastUpdated: string;
  version: string;
}