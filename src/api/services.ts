import { API_BASE_URL, API_ENDPOINTS } from './config';
import type { ISurvey, IRelation, IChoice, IQuestion } from './models/Survey';
import type { NewSurvey, NewQuestion, NewRelation } from '@assets/types';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Survey API functions
export const surveyApi = {
  getAll: () => apiRequest<ISurvey[]>(API_ENDPOINTS.surveys.getAll),
  
  getById: (id: number) => 
    apiRequest<ISurvey>(API_ENDPOINTS.surveys.getById(id)),
  
  create: (survey: NewSurvey) => 
    apiRequest<ISurvey>(API_ENDPOINTS.surveys.create, {
      method: 'POST',
      body: JSON.stringify(survey),
    }),
};

// Question API functions
export const questionApi = {
  getAll: () => apiRequest<IQuestion[]>(API_ENDPOINTS.questions.getAll),
  
  create: (question: NewQuestion) => 
    apiRequest<IQuestion>(API_ENDPOINTS.questions.create, {
      method: 'POST',
      body: JSON.stringify(question),
    }),
  getRelatedChoices: (questionId: number) => 
    apiRequest<IChoice[]>(API_ENDPOINTS.questions.getRelatedChoices(questionId)),
}; 

// Relation API functions
export const relationApi = {
  getById: (id: number) => apiRequest<IRelation>(API_ENDPOINTS.relations.getById(id)),
  create: (relation: NewRelation) =>
    apiRequest<IRelation>(API_ENDPOINTS.relations.create, {
      method: 'POST',
      body: JSON.stringify(relation),
    }),
}; 
