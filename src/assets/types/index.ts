import type { ISurvey, IRelation, IQuestion } from '@api/models/Survey';

export type NewQuestion = Omit<IQuestion, 'id'>

export type NewRelation = Omit<IRelation, 'id'>

export type EmptyRelation = {
    from_question: null;
    answer_choice: null;
    to_question: null;
}

export type NewSurvey = Omit<ISurvey, 'id'>

export enum Tab {
    PARAMS = 'params',
    QUESTIONS = 'questions',
    RELATIONS = 'relations',
    CONDITIONS = 'conditions',
    RESPONDENTS = 'respondents'
}
