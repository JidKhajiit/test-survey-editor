import mongoose, { Schema, Document } from 'mongoose';

export interface IAnswer {
  id: number;
  label: string;
}

export interface IQuestion {
  id: number;
  label: string;
  answers: IAnswer[];
}

export interface IRelation {
  question: IQuestion;
  answer: number | null;
  relatedQuestion: number;
}

export interface ISurvey extends Document {
  label: string;
  about: string;
  author: string;
  questions: IQuestion[];
  relations: IRelation[];
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  id: { type: Number, required: true },
  label: { type: String, required: true }
});

const QuestionSchema = new Schema<IQuestion>({
  id: { type: Number, required: true },
  label: { type: String, required: true },
  answers: [AnswerSchema]
});

const RelationSchema = new Schema<IRelation>({
  question: { type: QuestionSchema, required: true },
  answer: { type: Number, default: null },
  relatedQuestion: { type: Number, required: true }
});

const SurveySchema = new Schema<ISurvey>({
  label: { type: String, required: true },
  about: { type: String, required: true },
  author: { type: String, required: true },
  questions: [QuestionSchema],
  relations: [RelationSchema]
}, {
  timestamps: true
});

export const Survey = mongoose.model<ISurvey>('Survey', SurveySchema); 