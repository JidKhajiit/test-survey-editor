import mongoose, { Schema, Document } from 'mongoose';

export interface IChoice {
  id: number;
  choice_text: string;
}

export interface IQuestion {
  id: number;
  form: number;
  question_text: string;
  question_type: string;
  choices: IChoice[];
}

export interface IRelation {
  id: number;
  from_question: number;
  answer_choice: number | null;
  to_question: number;
}

export interface ISurvey extends Document {
  id: number;
  title: string;
  description: string;
  questions: IQuestion[];
}

const ChoiceSchema = new Schema<IChoice>({
  id: { type: Number, required: true },
  choice_text: { type: String, required: true }
});

const QuestionSchema = new Schema<IQuestion>({
  id: { type: Number, required: true },
  form: { type: Number, required: true },
  question_text: { type: String, required: true },
  question_type: { type: String, required: true },
  choices: [ChoiceSchema]
});

const RelationSchema = new Schema<IRelation>({
  from_question: { type: Number, required: true },
  answer_choice: { type: Number, default: null },
  to_question: { type: Number, required: true }
});

const SurveySchema = new Schema<ISurvey>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [QuestionSchema],
}, {
  timestamps: true
});

export const Survey = mongoose.model<ISurvey>('Survey', SurveySchema); 