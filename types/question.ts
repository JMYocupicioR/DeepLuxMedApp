export interface QuestionOption {
  value: number;
  label: string;
  description: string;
}

export interface Question {
  id: string;
  question: string;
  description: string;
  options: QuestionOption[];
}

export interface Assessment {
  id: string;
  scaleId: string;
  patientData: {
    name: string;
    age: string;
    gender: string;
    doctorName: string;
  };
  answers: Record<string, number>;
  date: Date;
  score: number;
  interpretation: string;
}